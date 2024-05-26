const { consola } = require("consola");
const { captureScreenshot } = require("../lib/screenshot");
const { rootFullPath } = require("../lib/utils");

/**
 * This script is used to take screenshots of the created challenge application.
 * It can capture screens of any size and can dynamically determine where the
 * screenshots should be saved.
 *
 * To skip a task, add its id/index to the ONLY_RUN_TASK_LIST_ID array.
 *
 * Note:
 * This script only works on local machines or computers that have access
 * to an executable browser path
 */

// You can easily see id/index of the task by looking at folder names
// {id/index}_{challange-name} where id/index is the index of the task
const ONLY_RUN_TASK_LIST_ID = [];
/**
 * List of tasks to take screenshots
 * @type {Array<Object>}
 * @property {Number} id - The index of the task (automatically added)
 * @property {String} name - The name of the task
 * @property {String} url - The URL of the page to capture (can be a local file using rootFullPath("path/to/file") helper or a deployed URL)
 * @property {String} dest - The destination folder to save the screenshot
 * @property {Array<Object>} sizes - An array of objects containing the width and height of the viewport
 * @property {Boolean} skip - A flag to skip the task (automatically added)
 */
const TASK_LIST = [
  {
    name: "1_qr-code-component",
    url: rootFullPath("1_qr-code-component/index.html"),
    dest: "1_qr-code-component/assets/images/screenshots",
    sizes: [
      { width: 1440, height: 800 },
      { width: 375, height: 667 },
    ],
  },
];

/**
 * An executable script to take screenshots of the created challenge application
 * that can capture screens of any size and can dynamically determine where the
 * screenshots should be saved.
 *
 * This script works well on local machines or computers that have access
 * to an executable browser path.
 */

/**
 * @name main
 * @description Main function to handle the screenshot tasks
 */
const main = async () => {
  const tasks = TASK_LIST.map((task, index) => {
    const idx = ++index;
    return {
      id: idx,
      ...task,
      skip: !ONLY_RUN_TASK_LIST_ID.includes(idx),
    };
  });

  const totalScreenshotsToTake = tasks
    .filter((task) => !task.skip)
    .reduce((total, task) => total + task.sizes.length, 0);

  if (totalScreenshotsToTake === 0) {
    consola.fail("No screenshots to take!");
    consola.info(
      "Please check the ONLY_RUN_TASK_LIST_ID array values in the script."
    );
    process.exit(0);
  }

  consola.warn(
    "This script will take and replace each screenshot in the destination folder if it already exists."
  );
  consola.info(`Total screenshots: ${totalScreenshotsToTake}`);

  const proceed = await consola.prompt(
    "Are you sure you want to continue? (y/n)",
    {
      default: "y",
      required: true,
      placeholder: "y",
    }
  );

  if (proceed.toLowerCase() === "n") {
    consola.info("Task is canceled!");
    process.exit(0);
  }

  consola.info("Starting to take screenshots...");

  for (const task of tasks) {
    if (task.skip) {
      consola.info(`[${task.name}] Task is skipped!`);
      continue;
    }

    for (const size of task.sizes) {
      await captureScreenshot({
        ...task,
        width: size.width,
        height: size.height,
      });
    }
  }
};

main()
  .catch((err) => {
    consola.error("Task failed!", err);
    process.exit(1);
  })
  .finally(() => consola.success("Task completed!"));
