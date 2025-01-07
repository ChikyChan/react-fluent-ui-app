const processEnv = import.meta.env

type EnvironmentVariables = {} & Pick<
  ImportMetaEnv,
  'BASE_URL' | 'MODE' | 'DEV' | 'PROD' | 'SSR'
>

export const env: EnvironmentVariables = Object.keys(processEnv).reduce(
  (acc, key) => {
    return { ...acc, [key]: processEnv[key] }
  },
  {},
) as EnvironmentVariables
