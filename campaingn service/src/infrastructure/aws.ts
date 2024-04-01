import AWS from 'aws-sdk';
// import env from '../env';

//TODO: DELETE THIS FILE
process.env.ENV_EXEC_CONF === 'development'
  ? AWS.config.update({
      region: 'us-east-1',
      // credentials: {
      //   accessKeyId: env.dynamodb.accessKeyId as string,
      //   secretAccessKey: env.dynamodb.secretAccessKey as string,
      // },
    })
  : AWS.config.update({ region: 'us-east-1' });

export default AWS;
