import { DB_CONN_STRING, DB_NAME } from "@environment/env";
import mongoose from "mongoose";
import retry from "retry";

const retryOperation = retry.operation({
  retries: 15,
  minTimeout: 1000 * 60 * 1.5, // 1:30 seconds
  maxTimeout: 1000 * 60 * 4, //  4 minutes
});

export const connectDatabase = async () => {
  retryOperation.attempt(async (currentAttempt) => {
    try {
      await mongoose.connect(DB_CONN_STRING, {
        dbName: DB_NAME,
        connectTimeoutMS: 1000 * 60 * 5, // 5 minutes
        waitQueueTimeoutMS: 1000 * 60 * 5, // 5 minutes,
        ignoreUndefined: true,
      });
    } catch (error: any) {
      if (retryOperation.retry(error)) {
        console.info(
          `Attempt: ${currentAttempt} failed to connect database: ${error.message}`,
        );
        console.info("###### Retrying... ######");

        return;
      }

      console.info(
        `Failed to connect database after ${currentAttempt} attempts`,
      );
    }
  });
};
