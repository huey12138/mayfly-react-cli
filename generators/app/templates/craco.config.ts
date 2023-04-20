import path from "path";
import ProgressBarPlugin from "progress-bar-webpack-plugin";
import TailwindCssPlugin from "tailwindcss";
import NodePolyfillWebpackPlugin from "node-polyfill-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import SentryCliPlugin from "@sentry/webpack-plugin";
import Package from "./package.json";
//@ts-ignore
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

module.exports = {
  style: {
    postOptions: {
      plugins: [TailwindCssPlugin],
    },
  },
  webpack: {
    mode: "production",
    alias: {
      "@": path.resolve(__dirname, "src/"),
      // crypto: false,
      // stream: false,
      // assert: false,
      // http: false,
      // https: false,
    },
    plugins: [
      new ProgressBarPlugin(),
      new NodePolyfillWebpackPlugin({
        excludeAliases: ["console"],
      }),
      new CompressionPlugin(),
      // new BundleAnalyzerPlugin({}),
      // new SentryCliPlugin({
      //   authToken:
      //     "f63a2eaa425b43bca62d9aba39de0cf1d5b2f449861a410dad08837190e7f812",
      //   org: "t-kg",
      //   include: "./build/static/js",
      //   project: "mayfly-ui",
      //   // ignoreFile: ".gitignore",
      //   release: `${Package.name}@${Package.version}`,
      //   ignore: ["node_modules"],
      //   urlPrefix: "~/",
      // }),
    ],
  },
};
