import { qaEnv } from "./qa.env";
import { stageEnv } from "./stage.env";

const environments = {
    qa: qaEnv,
    stage: stageEnv
}

export const currentEnv = environments[process.env.ENV as keyof typeof environments] || environments.qa;