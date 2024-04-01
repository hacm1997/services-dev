export enum EnvEnum {
  development_local,
  development,
  production,
}

export const EnvEnumValue = new Map<string, EnvEnum>([
  ['development_local', EnvEnum.development_local],
  ['development', EnvEnum.development],
  ['production', EnvEnum.production],
]);

export const EnvEnumMap = new Map<EnvEnum, any>([
  [
    EnvEnum.development_local,
    [
      {
        region: 'us-east-1',
        endpoint: 'http://localhost:8000',
      },
    ],
  ],
  [
    EnvEnum.development,
    [
      {
        region: 'us-east-1',
      },
    ],
  ],
]);
