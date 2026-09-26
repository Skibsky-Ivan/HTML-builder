1. Task: https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-0/modules/html-builder/html-builder.md
2. Screenshot:
   <img width="384" height="198" alt="изображение" src="https://github.com/user-attachments/assets/ec6ed2a9-84c0-49ea-854a-ac39b4158631" />
3. Deployment: 
4. Score: 390 / 390

- 01 - Read a file (40/40)
  - [x] Running `node 01-read-file` from the repository root prints the contents of `01-read-file/text.txt` to the console (20)
  - [x] File reading is implemented with `ReadStream`; no synchronous fs calls are used (20)

- 02 - Write console input to file (50/50)
  - [x] Running `node 02-write-file` creates a file inside `02-write-file/` and prints a prompt (10)
  - [x] Each line entered by the user is appended to that file (previous content is preserved) (15)
  - [x] The process keeps waiting for further input after each write (5)
  - [x] Typing `exit` prints a farewell message and terminates the process (10)
  - [x] Pressing `Ctrl + C` prints a farewell message and terminates the process (10)

- 03 - Files in folder (50/50)
  - [x] Running `node 03-files-in-folder` lists files from `03-files-in-folder/secret-folder` to the console (15)
  - [x] Each line is formatted as `<file name> - <extension> - <size>` (20)
  - [x] Subdirectories are not listed; only files directly inside `secret-folder` appear (15)

- 04 - Copy a directory (70/70)
  - [x] After running `node 04-copy-directory`, the `files-copy` folder exists and exactly mirrors the contents of `files` (30)
  - [x] Rerunning the script after files are added/modified inside `files` updates `files-copy` accordingly (20)
  - [x] Rerunning the script after files are removed from `files` also removes them from `files-copy` (20)

- 05 - Merge styles (45/45)
  - [x] After running `node 05-merge-styles`, `project-dist/bundle.css` exists and contains the concatenated contents of every `.css` file inside `styles` (20)
  - [x] Files with extensions other than `.css` and any subdirectories inside `styles` are ignored (10)
  - [x] Rerunning the script overwrites `bundle.css` with the up-to-date content of `styles` (15)

- 06 - Build page (135/135)
  - [x] After running `node 06-build-page`, the `project-dist` folder is created and contains `index.html`, `style.css`, and an `assets/` folder (20)
  - [x] `index.html` is built by substituting every `{{component-name}}` tag in `template.html` with the contents of `components/<component-name>.html` (35)
  - [x] `style.css` is a bundle of all `.css` files from the `styles` folder (20)
  - [x] `assets/` is an exact copy of `06-build-page/assets/` (20)
  - [x] The original `template.html` is not modified by the script (10)
  - [x] Two template tags written on the same line separated only by spaces (e.g. `{{about}} {{articles}}`) are processed as separate components without errors (10)
  - [x] Rerunning the script after a new component is added to `components/` and its tag is added to `template.html` correctly updates `project-dist/index.html`. Changes inside `styles/` and `assets/` are also picked up (20)
