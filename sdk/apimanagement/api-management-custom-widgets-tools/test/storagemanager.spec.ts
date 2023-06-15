import { expect } from "chai";
import sinon from "sinon";
import { StorageManager } from "../src/storagemanager";

describe("StorageManager", () => {
  let storageManager: StorageManager;
  let mockStorage: any;

  (global.window as any) = {};

  beforeEach(() => {
    mockStorage = {
      getItem: sinon.stub(),
      setItem: sinon.stub(),
      removeItem: sinon.stub(),
      clear: sinon.stub(),
      length: 0,
      key: sinon.stub(),
    };
    storageManager = new StorageManager();
    storageManager["storage"] = mockStorage;
    sinon.stub(console, "error");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getItem", () => {
    it("should return null if item does not exist", () => {
      mockStorage.getItem.returns(null);
      const result = storageManager.getItem("key");
      expect(result).to.be.null;
      expect(mockStorage.getItem.calledOnceWithExactly("key")).to.be.true;
    });

    it("should return parsed item value", () => {
      const itemValue = { foo: "bar" };
      mockStorage.getItem.returns(JSON.stringify(itemValue));
      const result = storageManager.getItem("key");
      expect(result).to.deep.equal(itemValue);
      expect(mockStorage.getItem.calledOnceWithExactly("key")).to.be.true;
    });

    it("should handle parsing errors and return null", () => {
      mockStorage.getItem.returns("invalid-json");
      const result = storageManager.getItem("key");
      expect(result).to.be.null;
      expect(mockStorage.getItem.calledOnceWithExactly("key")).to.be.true;
      expect((console.error as any).calledOnce).to.be.true;
      expect((console.error as any).calledWith("Failed to parse item"));
    });
  });

  describe("setItem", () => {
    it("should set serialized item in storage", () => {
      const itemValue = { foo: "bar" };
      storageManager.setItem("key", itemValue);
      expect(mockStorage.setItem.calledOnceWithExactly("key", JSON.stringify(itemValue))).to.be
        .true;
    });

    it("should handle serialization errors", () => {
      const itemValue = { circularRef: null };
      (itemValue.circularRef as any) = itemValue;
      storageManager.setItem("key", itemValue);
      expect((console.error as any).calledOnce).to.be.true;
      expect((console.error as any).calledWith("Failed to serialize item"));
    });
  });

  describe("removeItem", () => {
    it("should remove item from storage", () => {
      storageManager.removeItem("key");
      expect(mockStorage.removeItem.calledOnceWithExactly("key")).to.be.true;
    });
  });

  describe("clear", () => {
    it("should clear the storage", () => {
      storageManager.clear();
      expect(mockStorage.clear.calledOnce).to.be.true;
    });
  });
});
