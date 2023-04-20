export const pathJoin = (...path: string[]): string => {
  const list: string[] = [];

  path.filter(Boolean).forEach((item, index, { length }) => {
    if (typeof item !== "string") {
      const prefix = `pathJoin need argument be string but get`;
      const itemType = typeof item;
      const num = itemType === "object" ? "an" : "a";

      const errMsg = `${prefix} ${num} ${itemType}`;
      throw new TypeError(errMsg);
    }

    if (!index && length === 1) {
      // only one param
      list.push(item);
    }

    // multiple param
    else if (!index) {
      // 第一个参数仅去掉最后一个 "/"
      list.push(item.replace(/\/$/, ""));
    } else if (index === length - 1) {
      // 最后一个参数仅去掉第一个 "/"
      list.push(item.replace(/^\//, ""));
    } else {
      list.push(item.replace(/^\//, "").replace(/\/$/, ""));
    }
  });

  return list.join("/");
};
