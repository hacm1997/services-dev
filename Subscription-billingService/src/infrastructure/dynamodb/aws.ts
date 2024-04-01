import AWS from "aws-sdk";
import env from "../../env";

//TODO: DELETE THIS FILE
env.NODE_ENV === "development"
  ? AWS.config.update({
      region: env.dynamodb.region,
      credentials: {
        accessKeyId: env.dynamodb.accessKeyId as string,
        secretAccessKey: env.dynamodb.secretAccessKey as string,
      },
    })
  : AWS.config.update({ region: env.dynamodb.region });

export default AWS;
