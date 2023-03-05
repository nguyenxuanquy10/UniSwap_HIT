task(
  "flat",
  "Flattens and prints contracts and their dependencies (Resolves licenses)"
)
  .addOptionalVariadicPositionalParam(
    "files",
    "The files to flatten",
    undefined,
    types.inputFile
  )
  .setAction(async ({ files }, hre) => {
    let flattened = await hre.run("flatten:get-flattened-sources", { files });

    // Remove every line started with "// SPDX-License-Identifier:"
    flattened = flattened.replace(
      /SPDX-License-Identifier:/gm,
      "License-Identifier:"
    );
    flattened = `// SPDX-License-Identifier: MIXED\n\n${flattened}`;

    // Remove every line started with "pragma experimental ABIEncoderV2;" except the first one
    flattened = flattened.replace(
      /pragma experimental ABIEncoderV2;\n/gm,
      (
        (i) => (m) =>
          !i++ ? m : ""
      )(0)
    );
    // console.log(flattened);
    const fs = require("fs");

    // const content = "Some content!";
    console.log(__dirname);

    // fs.writeFile("./contracts/test.js", flattened, (err) => {
    //   if (err) {
    //     console.error(err);
    //   }
    //   // file written successfully
    // });
    try {
      fs.writeFileSync("./contracts/test.sol", flattened);
      // file written successfully
    } catch (err) {
      console.error(err);
    }
  });
