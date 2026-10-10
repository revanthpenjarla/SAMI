import os

def replace_in_file(filepath, old, new):
    if not os.path.exists(filepath):
        return
    with open(filepath, "r") as f:
        content = f.read()
    content = content.replace(old, new)
    with open(filepath, "w") as f:
        f.write(content)

replace_in_file("scripts/deploy_audit_registry.py", "pip install web3", "uv pip install web3")
replace_in_file("scripts/DEPLOYMENT_README.md", "pip install web3", "uv pip install web3")
replace_in_file("research/evaluation/FINAL_EVALUATION_REPORT.md", "pip install -r backend/requirements.txt", "uv pip install -r backend/requirements.txt")
replace_in_file("research/evaluation/FINAL_EVALUATION_REPORT.md", "npm install", "bun install")
replace_in_file("research/evaluation/FINAL_EVALUATION_REPORT.md", "npm run build", "bun run build")
replace_in_file("research/evaluation/FINAL_CORRECTION_PASS_REPORT.md", "npm run build", "bun run build")
