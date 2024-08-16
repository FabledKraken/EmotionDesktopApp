---
# EmotionDesktopApp

EmotionDesktopApp is a desktop application built using Nativefier and distributed as a `.dmg` file. This README provides detailed instructions for downloading, installing, and running the application on macOS, including steps to bypass macOS Gatekeeper security settings.

## Requirements

- macOS
- Administrator access (required for some steps)
- Terminal access (for running commands)

## Downloading the Application

1. **Download the Application:**
   - Download the `EmotionDesktopApp.dmg` file from the provided link.
   - https://github.com/FabledKraken/fabledkraken.github.io/actions/runs/10414138026/artifacts/1818519553

## Installing the Application

### Step 1: Open the `.dmg` File

1. **Double-click the `.dmg` file** to mount it.
   - This will open a Finder window displaying the contents of the disk image.

### Step 2: Move the Application to the `/Applications` Folder

1. **Drag and Drop the App:**
   - Drag the `EmotionDesktopApp.app` from the mounted `.dmg` window to your `/Applications` folder.
   - You can open another Finder window and navigate to the `/Applications` folder, or drag it to the "Applications" shortcut in the Finder sidebar.

### Step 3: Remove Quarantine Attribute (Required)

macOS may apply a quarantine attribute to apps downloaded from the internet, causing them to be flagged as "damaged" or preventing them from running. Follow these steps to remove the quarantine:

1. **Open Terminal:**
   - You can find Terminal in `Applications > Utilities` or use Spotlight search.

2. **Run the Following Command in Terminal:**

   ```bash
   sudo xattr -rd com.apple.quarantine /Applications/EmotionDesktopApp.app
   ```

   - You will be prompted to enter your administrator password.

### Step 4: Disable Gatekeeper (Optional)

If macOS still prevents the app from running, you may need to temporarily disable Gatekeeper. This step is optional but might be necessary depending on your security settings.

1. **Disable Gatekeeper:**
   - In Terminal, run the following command:

   ```bash
   sudo spctl --master-disable
   ```

   - This command allows apps from any source to be opened.

2. **Re-enable Gatekeeper (Recommended After Installation):**
   - After successfully launching the app, you can re-enable Gatekeeper by running:

   ```bash
   sudo spctl --master-enable
   ```

## Running the Application

1. **Open the Application:**
   - Go to the `/Applications` folder in Finder and double-click `EmotionDesktopApp.app` to launch it.

## Troubleshooting

- **App is flagged as damaged:**
  - Ensure you have run the `xattr` command to remove the quarantine attribute.
  - Temporarily disable Gatekeeper if necessary.

- **App won't open after disabling Gatekeeper:**
  - Make sure the quarantine attribute has been removed using the `xattr` command.

## Contact

For any issues or further assistance, please contact me.

---
