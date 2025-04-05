import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export default async function (req, res) {
  // Parse the incoming request payload
  const payload = JSON.parse(req.body);
  const code = payload.code;

  if (!code) {
    return res.json({ error: "No code provided" }, 400);
  }

  try {
    const { stdout, stderr } = await execAsync(`node -e "${code}"`);
    if (stderr) {
      return res.json({ output: stderr, success: false }, 500);
    }
    return res.json({ output: stdout, success: true }, 200);
  } catch (error) {
    return res.json({ output: error.message, success: false }, 500);
  }
}
