import { Request, Response } from "express";
import fs from "fs";
import {
  addEnvToVercel,
  writeConfigData,
  writeEnvToFile,
} from "../installattion/installationFunctions";

// export const addEnv = async (req: Request, res: Response) => {
//   const { dbUri, apiToken } = req.body;

//   try {
//     if (!dbUri || !apiToken) {
//       return res.status(400).send("dbUri and apiToken are required");
//     }

//     const response1 = await addEnvToVercel("DATABASE_URI", dbUri);
//     const response2 = await addEnvToVercel("API_TOKEN", apiToken);

//     if (response1 && response2) {
//       res
//         .status(200)
//         .json({ message: "Environment Variables Set Successfully" });
//     } else {
//       res.status(500).send("Failed to set environment variables.");
//     }
//   } catch (error: any) {
//     res.status(500).send("Error during setup: " + error.message);
//   }
// };

export const addConfigData = async (req: Request, res: Response) => {
  const configDatas = req.body;

  try {
    if (!configDatas) {
      return res.status(400).send("configDatas is required");
    }
    const result = await writeConfigData(configDatas);
    if (result) {
      res.status(200).json({
        message: "Setup configuration has been updated successfully.",
      });
    } else {
      res
        .status(500)
        .json({ message: "Failed to update setup configuration." });
    }
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: `Error during setup: ${error.message}` });
  }
};

export const updateEnvData = async (req: Request, res: Response) => {
  const envData = req.body;

  try {
    if (typeof envData !== "object" || envData === null) {
      return res.status(400).send("Invalid input data. Expected an object.");
    }

    const result = await writeEnvToFile(envData);

    if (result) {
      res.status(200).json({
        message: "Environment variables have been updated successfully.",
      });
    } else {
      res
        .status(500)
        .json({ message: "Failed to update environment variables." });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error during environment update: ${error.message}` });
  }
};

export const completeInstallation = async (req: Request, res: Response) => {
  const envFilePath = ".env";
  try {
    if (!fs.existsSync(envFilePath)) {
      console.log(".env file does not exist.");
      return res.status(404).send("env file not found");
    }

    const envFileContent = fs.readFileSync(envFilePath, "utf8");
    const envVariables: Record<string, string> = {};

    envFileContent.split("\n").forEach((line) => {
      const [key, value] = line.split("=");
      if (key && value) {
        envVariables[key.trim()] = value.trim();
      }
    });

    for (const [key, value] of Object.entries(envVariables)) {
      const success = await addEnvToVercel(key, value);
      if (!success) {
        console.log(`Failed to add environment variable ${key} to Vercel.`);
        return res.status(500).send("Failed to post Env");
      }
    }
    const installationCompleteData = {
      setupComplete: true,
    };
    try {
      writeConfigData(installationCompleteData);
    } catch (error: any) {
      console.log(error);
      return res.status(500).send("Failed to Set completion flag");
    }
    return res.status(200).send("Installation Completed");
  } catch (error) {
    console.error("Error reading .env file or posting to Vercel:", error);
    return res.status(500).send("Internal server error");
  }
};

export const checkConfig = async (req: Request, res: Response) => {
  const configPath = "config.json";

  if (fs.existsSync(configPath)) {
    try {
      const configData = fs.readFileSync(configPath, "utf8");
      const config = JSON.parse(configData);

      if (config.setupComplete) {
        return res.status(200).json({ message: "Setup configured" });
      } else {
        return res.status(200).json({ message: "Setup not configured" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error reading config file", error: err });
    }
  } else {
    return res.status(404).json({ message: "config.json not found" });
  }
};
export const configured = async (req: Request, res: Response) => {
  res.send("configured").status(200);
};
