+++
title = "interactiveUse"
date = 2024-10-09T13:37:26+08:00
type = "docs"
weight = 20
description = ""
isCJKLanguage = true
draft = false
+++

# Interactive use

Fish prides itself on being really nice to use interactively. That’s down to a few features we’ll explain in the next few sections.

Fish is used by giving commands in the fish language, see [The Fish Language](https://fishshell.com/docs/current/language.html#language) for information on that.

## Help

Fish has an extensive help system. Use the [help](https://fishshell.com/docs/current/cmds/help.html) command to obtain help on a specific subject or command. For instance, writing `help syntax` displays the [syntax section](https://fishshell.com/docs/current/language.html#syntax) of this documentation.

Fish also has man pages for its commands, and translates the help pages to man pages. For example, `man set` will show the documentation for `set` as a man page.

Help on a specific builtin can also be obtained with the `-h` parameter. For instance, to obtain help on the [fg](https://fishshell.com/docs/current/cmds/fg.html) builtin, either type `fg -h` or `help fg`.

The main page can be viewed via `help index` (or just `help`) or `man fish-doc`. The tutorial can be viewed with `help tutorial` or `man fish-tutorial`.



## Autosuggestions

fish suggests commands as you type, based on [command history](https://fishshell.com/docs/current/interactive.html#history-search), completions, and valid file paths. As you type commands, you will see a suggestion offered after the cursor, in a muted gray color (which can be changed with the `fish_color_autosuggestion` variable).

To accept the autosuggestion (replacing the command line contents), press → or Control+F. To accept the first suggested word, press Alt+→ or Alt+F. If the autosuggestion is not what you want, just ignore it: it won’t execute unless you accept it.

Autosuggestions are a powerful way to quickly summon frequently entered commands, by typing the first few characters. They are also an efficient technique for navigating through directory hierarchies.

If you don’t like autosuggestions, you can disable them by setting `$fish_autosuggestion_enabled` to 0:

```
set -g fish_autosuggestion_enabled 0

```



## Tab Completion

Tab completion is a time saving feature of any modern shell. When you type Tab, fish tries to guess the rest of the word under the cursor. If it finds just one possibility, it inserts it. If it finds more, it inserts the longest unambiguous part and then opens a menu (the “pager”) that you can navigate to find what you’re looking for.

The pager can be navigated with the arrow keys, Page Up / Page Down, Tab or Shift+Tab. Pressing Control+S (the `pager-toggle-search` binding - / in vi-mode) opens up a search menu that you can use to filter the list.

Fish provides some general purpose completions, like for commands, variable names, usernames or files.

It also provides a large number of program specific scripted completions. Most of these completions are simple options like the `-l` option for `ls`, but a lot are more advanced. For example:

- `man` and `whatis` show the installed manual pages as completions.
- `make` uses targets in the Makefile in the current directory as completions.
- `mount` uses mount points specified in fstab as completions.
- `apt`, `rpm` and `yum` show installed or installable packages

You can also write your own completions or install some you got from someone else. For that, see [Writing your own completions](https://fishshell.com/docs/current/completions.html#completion-own).

Completion scripts are loaded on demand, just like [functions are](https://fishshell.com/docs/current/language.html#syntax-function-autoloading). The difference is the `$fish_complete_path` [list](https://fishshell.com/docs/current/language.html#variables-lists) is used instead of `$fish_function_path`. Typically you can drop new completions in ~/.config/fish/completions/name-of-command.fish and fish will find them automatically.



## Syntax highlighting

Fish interprets the command line as it is typed and uses syntax highlighting to provide feedback. The most important feedback is the detection of potential errors. By default, errors are marked red.

Detected errors include:

- Non-existing commands.
- Reading from or appending to a non-existing file.
- Incorrect use of output redirects
- Mismatched parenthesis

To customize the syntax highlighting, you can set the environment variables listed in the [Variables for changing highlighting colors](https://fishshell.com/docs/current/interactive.html#variables-color) section.

Fish also provides pre-made color themes you can pick with [fish_config](https://fishshell.com/docs/current/cmds/fish_config.html). Running just `fish_config` opens a browser interface, or you can use `fish_config theme` in the terminal.

For example, to disable nearly all coloring:

```
fish_config theme choose none

```

Or, to see all themes, right in your terminal:

```
fish_config theme show

```



### Syntax highlighting variables

The colors used by fish for syntax highlighting can be configured by changing the values of various variables. The value of these variables can be one of the colors accepted by the [set_color](https://fishshell.com/docs/current/cmds/set_color.html) command. The modifier switches accepted by `set_color` like `--bold`, `--dim`, `--italics`, `--reverse` and `--underline` are also accepted.

Example: to make errors highlighted and red, use:

```
set fish_color_error red --bold

```

The following variables are available to change the highlighting colors in fish:

| Variable                   | Meaning                                                      |
| -------------------------- | ------------------------------------------------------------ |
| fish_color_normal          | default color                                                |
| fish_color_command         | commands like echo                                           |
| fish_color_keyword         | keywords like if - this falls back on the command color if unset |
| fish_color_quote           | quoted text like `"abc"`                                     |
| fish_color_redirection     | IO redirections like >/dev/null                              |
| fish_color_end             | process separators like `;` and `&`                          |
| fish_color_error           | syntax errors                                                |
| fish_color_param           | ordinary command parameters                                  |
| fish_color_valid_path      | parameters that are filenames (if the file exists)           |
| fish_color_option          | options starting with “-”, up to the first “--” parameter    |
| fish_color_comment         | comments like ‘# important’                                  |
| fish_color_selection       | selected text in vi visual mode                              |
| fish_color_operator        | parameter expansion operators like `*` and `~`               |
| fish_color_escape          | character escapes like `\n` and `\x70`                       |
| fish_color_autosuggestion  | autosuggestions (the proposed rest of a command)             |
| fish_color_cwd             | the current working directory in the default prompt          |
| fish_color_cwd_root        | the current working directory in the default prompt for the root user |
| fish_color_user            | the username in the default prompt                           |
| fish_color_host            | the hostname in the default prompt                           |
| fish_color_host_remote     | the hostname in the default prompt for remote sessions (like ssh) |
| fish_color_status          | the last command’s nonzero exit code in the default prompt   |
| fish_color_cancel          | the ‘^C’ indicator on a canceled command                     |
| fish_color_search_match    | history search matches and selected pager items (background only) |
| fish_color_history_current | the current position in the history for commands like `dirh` and `cdh` |

If a variable isn’t set or is empty, fish usually tries `$fish_color_normal`, except for:

- `$fish_color_keyword`, where it tries `$fish_color_command` first.
- `$fish_color_option`, where it tries `$fish_color_param` first.
- For `$fish_color_valid_path`, if that doesn’t have a color, but only modifiers, it adds those to the color that would otherwise be used, like `$fish_color_param`. But if valid paths have a color, it uses that and adds in modifiers from the other color.



### Pager color variables

fish will sometimes present a list of choices in a table, called the pager.

Example: to set the background of each pager row, use:

```
set fish_pager_color_background --background=white

```

To have black text on alternating white and gray backgrounds:

```
set fish_pager_color_prefix black
set fish_pager_color_completion black
set fish_pager_color_description black
set fish_pager_color_background --background=white
set fish_pager_color_secondary_background --background=brwhite

```

Variables affecting the pager colors:

| Variable                               | Meaning                                                     |
| -------------------------------------- | ----------------------------------------------------------- |
| fish_pager_color_progress              | the progress bar at the bottom left corner                  |
| fish_pager_color_background            | the background color of a line                              |
| fish_pager_color_prefix                | the prefix string, i.e. the string that is to be completed  |
| fish_pager_color_completion            | the completion itself, i.e. the proposed rest of the string |
| fish_pager_color_description           | the completion description                                  |
| fish_pager_color_selected_background   | background of the selected completion                       |
| fish_pager_color_selected_prefix       | prefix of the selected completion                           |
| fish_pager_color_selected_completion   | suffix of the selected completion                           |
| fish_pager_color_selected_description  | description of the selected completion                      |
| fish_pager_color_secondary_background  | background of every second unselected completion            |
| fish_pager_color_secondary_prefix      | prefix of every second unselected completion                |
| fish_pager_color_secondary_completion  | suffix of every second unselected completion                |
| fish_pager_color_secondary_description | description of every second unselected completion           |

When the secondary or selected variables aren’t set or are empty, the normal variables are used, except for `$fish_pager_color_selected_background`, where the background of `$fish_color_search_match` is tried first.



## Abbreviations

To avoid needless typing, a frequently-run command like `git checkout` can be abbreviated to `gco` using the [abbr](https://fishshell.com/docs/current/cmds/abbr.html) command.

```
abbr -a gco git checkout

```

After entering `gco` and pressing Space or Enter, a `gco` in command position will turn into `git checkout` in the command line. If you want to use a literal `gco` sometimes, use Control+Space [[1\]](https://fishshell.com/docs/current/interactive.html#id5).

This is a lot more powerful, for example you can make going up a number of directories easier with this:

```
function multicd
    echo cd (string repeat -n (math (string length -- $argv[1]) - 1) ../)
end
abbr --add dotdot --regex '^\.\.+$' --function multicd

```

Now, `..` transforms to `cd ../`, while `...` turns into `cd ../../` and `....` expands to `cd ../../../`.

The advantage over aliases is that you can see the actual command before using it, add to it or change it, and the actual command will be stored in history.

[[1](https://fishshell.com/docs/current/interactive.html#id4)] 

Any binding that executes the `expand-abbr` or `execute` [bind function](https://fishshell.com/docs/current/cmds/bind.html) will expand abbreviations. By default Control+Space is bound to just inserting a space.



## Programmable title

When using most virtual terminals, it is possible to set the message displayed in the titlebar of the terminal window. This can be done automatically in fish by defining the [fish_title](https://fishshell.com/docs/current/cmds/fish_title.html) function. The [fish_title](https://fishshell.com/docs/current/cmds/fish_title.html) function is executed before and after a new command is executed or put into the foreground and the output is used as a titlebar message. The [status current-command](https://fishshell.com/docs/current/cmds/status.html) builtin will always return the name of the job to be put into the foreground (or `fish` if control is returning to the shell) when the [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html) function is called. The first argument to fish_title will contain the most recently executed foreground command as a string.

The default fish title shows the hostname if connected via ssh, the currently running command (unless it is fish) and the current working directory. All of this is shortened to not make the tab too wide.

Examples:

To show the last command and working directory in the title:

```
function fish_title
    # `prompt_pwd` shortens the title. This helps prevent tabs from becoming very wide.
    echo $argv[1] (prompt_pwd)
    pwd
end

```



## Programmable prompt

When it is fish’s turn to ask for input (like after it started or the command ended), it will show a prompt. It does this by running the [fish_prompt](https://fishshell.com/docs/current/cmds/fish_prompt.html) and [fish_right_prompt](https://fishshell.com/docs/current/cmds/fish_right_prompt.html) functions.

The output of the former is displayed on the left and the latter’s output on the right side of the terminal. The output of [fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html) will be prepended on the left, though the default function only does this when in [vi-mode](https://fishshell.com/docs/current/interactive.html#vi-mode).



## Configurable greeting

When it is started interactively, fish tries to run the [fish_greeting](https://fishshell.com/docs/current/cmds/fish_greeting.html) function. The default fish_greeting prints a simple greeting. You can change its text by changing the `$fish_greeting` variable, for instance using a [universal variable](https://fishshell.com/docs/current/language.html#variables-universal):

```
set -U fish_greeting

```

or you can set it [globally](https://fishshell.com/docs/current/language.html#variables-scope) in [config.fish](https://fishshell.com/docs/current/language.html#configuration):

```
set -g fish_greeting 'Hey, stranger!'

```

or you can script it by changing the function:

```
function fish_greeting
    random choice "Hello!" "Hi" "G'day" "Howdy"
end

```

save this in config.fish or [a function file](https://fishshell.com/docs/current/language.html#syntax-function-autoloading). You can also use [funced](https://fishshell.com/docs/current/cmds/funced.html) and [funcsave](https://fishshell.com/docs/current/cmds/funcsave.html) to edit it easily.



## Private mode

If `$fish_private_mode` is set to a non-empty value, commands will not be written to the history file on disk.

You can also launch with `fish --private` (or `fish -P` for short). This both hides old history and prevents writing history to disk. This is useful to avoid leaking personal information (e.g. for screencasts) or when dealing with sensitive information.

You can query the variable `fish_private_mode` (`if test -n "$fish_private_mode" ...`) if you would like to respect the user’s wish for privacy and alter the behavior of your own fish scripts.



## Command line editor

The fish editor features copy and paste, a [searchable history](https://fishshell.com/docs/current/interactive.html#history-search) and many editor functions that can be bound to special keyboard shortcuts.

Like bash and other shells, fish includes two sets of keyboard shortcuts (or key bindings): one inspired by the Emacs text editor, and one by the Vi text editor. The default editing mode is Emacs. You can switch to Vi mode by running [fish_vi_key_bindings](https://fishshell.com/docs/current/cmds/fish_vi_key_bindings.html) and switch back with [fish_default_key_bindings](https://fishshell.com/docs/current/cmds/fish_default_key_bindings.html). You can also make your own key bindings by creating a function and setting the `fish_key_bindings` variable to its name. For example:

```
function fish_hybrid_key_bindings --description \
"Vi-style bindings that inherit emacs-style bindings in all modes"
    for mode in default insert visual
        fish_default_key_bindings -M $mode
    end
    fish_vi_key_bindings --no-erase
end
set -g fish_key_bindings fish_hybrid_key_bindings

```

While the key bindings included with fish include many of the shortcuts popular from the respective text editors, they are not a complete implementation. They include a shortcut to open the current command line in your preferred editor (Alt+E by default) if you need the full power of your editor.



### Shared bindings

Some bindings are common across Emacs and Vi mode, because they aren’t text editing bindings, or because what Vi/Vim does for a particular key doesn’t make sense for a shell.

- Tab [completes](https://fishshell.com/docs/current/interactive.html#tab-completion) the current token. Shift+Tab completes the current token and starts the pager’s search mode. Tab is the same as Control+I.
- ← (Left) and → (Right) move the cursor left or right by one character. If the cursor is already at the end of the line, and an autosuggestion is available, → accepts the autosuggestion.
- Enter executes the current commandline or inserts a newline if it’s not complete yet (e.g. a `)` or `end` is missing).
- Alt+Enter inserts a newline at the cursor position.
- Alt+← and Alt+→ move the cursor one word left or right (to the next space or punctuation mark), or moves forward/backward in the directory history if the command line is empty. If the cursor is already at the end of the line, and an autosuggestion is available, Alt+→ (or Alt+F) accepts the first word in the suggestion.
- Control+← and Control+→ move the cursor one word left or right. These accept one word of the autosuggestion - the part they’d move over.
- Shift+← and Shift+→ move the cursor one word left or right, without stopping on punctuation. These accept one big word of the autosuggestion.
- ↑ (Up) and ↓ (Down) (or Control+P and Control+N for emacs aficionados) search the command history for the previous/next command containing the string that was specified on the commandline before the search was started. If the commandline was empty when the search started, all commands match. See the [history](https://fishshell.com/docs/current/interactive.html#history-search) section for more information on history searching.
- Alt+↑ and Alt+↓ search the command history for the previous/next token containing the token under the cursor before the search was started. If the commandline was not on a token when the search started, all tokens match. See the [history](https://fishshell.com/docs/current/interactive.html#history-search) section for more information on history searching.
- Control+C interrupt/kill whatever is running (SIGINT).
- Control+D delete one character to the right of the cursor. If the command line is empty, Control+D will exit fish.
- Control+U removes contents from the beginning of line to the cursor (moving it to the [killring](https://fishshell.com/docs/current/interactive.html#killring)).
- Control+L clears and repaints the screen.
- Control+W removes the previous path component (everything up to the previous “/”, “:” or “@”) (moving it to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring)).
- Control+X copies the current buffer to the system’s clipboard, Control+V inserts the clipboard contents. (see [fish_clipboard_copy](https://fishshell.com/docs/current/cmds/fish_clipboard_copy.html) and [fish_clipboard_paste](https://fishshell.com/docs/current/cmds/fish_clipboard_paste.html))
- Alt+D moves the next word to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring).
- Alt+H (or F1) shows the manual page for the current command, if one exists.
- Alt+L lists the contents of the current directory, unless the cursor is over a directory argument, in which case the contents of that directory will be listed.
- Alt+O opens the file at the cursor in a pager.
- Alt+P adds the string `&| less;` to the end of the job under the cursor. The result is that the output of the command will be paged.
- Alt+W prints a short description of the command under the cursor.
- Alt+E edit the current command line in an external editor. The editor is chosen from the first available of the `$VISUAL` or `$EDITOR` variables.
- Alt+V Same as Alt+E.
- Alt+S Prepends `sudo` to the current commandline. If the commandline is empty, prepend `sudo` to the last commandline.
- Control+Space Inserts a space without expanding an [abbreviation](https://fishshell.com/docs/current/interactive.html#abbreviations). For vi-mode this only applies to insert-mode.



### Emacs mode commands

To enable emacs mode, use [fish_default_key_bindings](https://fishshell.com/docs/current/cmds/fish_default_key_bindings.html). This is also the default.

- Home or Control+A moves the cursor to the beginning of the line.
- End or Control+E moves to the end of line. If the cursor is already at the end of the line, and an autosuggestion is available, End or Control+E accepts the autosuggestion.
- Control+B, Control+F move the cursor one character left or right or accept the autosuggestion just like the ← (Left) and → (Right) shared bindings (which are available as well).
- Control+N, Control+P move the cursor up/down or through history, like the up and down arrow shared bindings.
- Delete or Backspace removes one character forwards or backwards respectively. This also goes for Control+H, which is indistinguishable from backspace.
- Alt+Backspace removes one word backwards.
- Alt+< moves to the beginning of the commandline, Alt+> moves to the end.
- Control+K deletes from the cursor to the end of line (moving it to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring)).
- Escape and Control+G cancel the current operation. Immediately after an unambiguous completion this undoes it.
- Alt+C capitalizes the current word.
- Alt+U makes the current word uppercase.
- Control+T transposes the last two characters.
- Alt+T transposes the last two words.
- Control+Z, Control+_ (Control+/ on some terminals) undo the most recent edit of the line.
- Alt+/ reverts the most recent undo.
- Control+R opens the history in a pager. This will show history entries matching the search, a few at a time. Pressing Control+R again will search older entries, pressing Control+S (that otherwise toggles pager search) will go to newer entries. The search bar will always be selected.

You can change these key bindings using the [bind](https://fishshell.com/docs/current/cmds/bind.html) builtin.



### Vi mode commands

Vi mode allows for the use of Vi-like commands at the prompt. Initially, [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert) is active. Escape enters [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command). The commands available in command, insert and visual mode are described below. Vi mode shares [some bindings](https://fishshell.com/docs/current/interactive.html#shared-binds) with [Emacs mode](https://fishshell.com/docs/current/interactive.html#emacs-mode).

To enable vi mode, use [fish_vi_key_bindings](https://fishshell.com/docs/current/cmds/fish_vi_key_bindings.html). It is also possible to add all emacs-mode bindings to vi-mode by using something like:

```
function fish_user_key_bindings
    # Execute this once per mode that emacs bindings should be used in
    fish_default_key_bindings -M insert

    # Then execute the vi-bindings so they take precedence when there's a conflict.
    # Without --no-erase fish_vi_key_bindings will default to
    # resetting all bindings.
    # The argument specifies the initial mode (insert, "default" or visual).
    fish_vi_key_bindings --no-erase insert
end

```

When in vi-mode, the [fish_mode_prompt](https://fishshell.com/docs/current/cmds/fish_mode_prompt.html) function will display a mode indicator to the left of the prompt. To disable this feature, override it with an empty function. To display the mode elsewhere (like in your right prompt), use the output of the `fish_default_mode_prompt` function.

When a binding switches the mode, it will repaint the mode-prompt if it exists, and the rest of the prompt only if it doesn’t. So if you want a mode-indicator in your `fish_prompt`, you need to erase `fish_mode_prompt` e.g. by adding an empty file at `~/.config/fish/functions/fish_mode_prompt.fish`. (Bindings that change the mode are supposed to call the repaint-mode bind function, see [bind](https://fishshell.com/docs/current/cmds/bind.html))

The `fish_vi_cursor` function will be used to change the cursor’s shape depending on the mode in supported terminals. The following snippet can be used to manually configure cursors after enabling vi-mode:

```
# Emulates vim's cursor shape behavior
# Set the normal and visual mode cursors to a block
set fish_cursor_default block
# Set the insert mode cursor to a line
set fish_cursor_insert line
# Set the replace mode cursors to an underscore
set fish_cursor_replace_one underscore
set fish_cursor_replace underscore
# Set the external cursor to a line. The external cursor appears when a command is started.
# The cursor shape takes the value of fish_cursor_default when fish_cursor_external is not specified.
set fish_cursor_external line
# The following variable can be used to configure cursor shape in
# visual mode, but due to fish_cursor_default, is redundant here
set fish_cursor_visual block

```

Additionally, `blink` can be added after each of the cursor shape parameters to set a blinking cursor in the specified shape.

Fish knows the shapes “block”, “line” and “underscore”, other values will be ignored.

If the cursor shape does not appear to be changing after setting the above variables, it’s likely your terminal emulator does not support the capabilities necessary to do this. It may also be the case, however, that `fish_vi_cursor` has not detected your terminal’s features correctly (for example, if you are using `tmux`). If this is the case, you can force `fish_vi_cursor` to set the cursor shape by setting `$fish_vi_force_cursor` in `config.fish`. You’ll have to restart fish for any changes to take effect. If cursor shape setting remains broken after this, it’s almost certainly an issue with your terminal emulator, and not fish.



#### Command mode

Command mode is also known as normal mode.

- h moves the cursor left.
- l moves the cursor right.
- k and j search the command history for the previous/next command containing the string that was specified on the commandline before the search was started. If the commandline was empty when the search started, all commands match. See the [history](https://fishshell.com/docs/current/interactive.html#history-search) section for more information on history searching. In multi-line commands, they move the cursor up and down respectively.
- i enters [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert) at the current cursor position.
- Shift+I enters [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert) at the beginning of the line.
- v enters [visual mode](https://fishshell.com/docs/current/interactive.html#vi-mode-visual) at the current cursor position.
- a enters [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert) after the current cursor position.
- Shift+A enters [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert) at the end of the line.
- o inserts a new line under the current one and enters [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert)
- O (capital-“o”) inserts a new line above the current one and enters [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert)
- 0 (zero) moves the cursor to beginning of line (remaining in command mode).
- d+d deletes the current line and moves it to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring).
- Shift+D deletes text after the current cursor position and moves it to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring).
- p pastes text from the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring).
- u undoes the most recent edit of the command line.
- Control+R redoes the most recent edit.
- [ and ] search the command history for the previous/next token containing the token under the cursor before the search was started. See the [history](https://fishshell.com/docs/current/interactive.html#history-search) section for more information on history searching.
- / opens the history in a pager. This will show history entries matching the search, a few at a time. Pressing it again will search older entries, pressing Control+S (that otherwise toggles pager search) will go to newer entries. The search bar will always be selected.
- Backspace moves the cursor left.
- g / G moves the cursor to the beginning/end of the commandline, respectively.
- :q exits fish.



#### Insert mode

- Escape enters [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command).
- Backspace removes one character to the left.



#### Visual mode

- ← (Left) and → (Right) extend the selection backward/forward by one character.
- h moves the cursor left.
- l moves the cursor right.
- k moves the cursor up.
- j moves the cursor down.
- b and w extend the selection backward/forward by one word.
- d and x move the selection to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring) and enter [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command).
- Escape and Control+C enter [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command).
- c and s remove the selection and switch to insert mode.
- X moves the entire line to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring), and enters [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command).
- y copies the selection to the [Copy and paste (Kill Ring)](https://fishshell.com/docs/current/interactive.html#killring), and enters [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command).
- ~ toggles the case (upper/lower) on the selection, and enters [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command).
- "*y copies the selection to the clipboard, and enters [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command).



### Custom bindings

In addition to the standard bindings listed here, you can also define your own with [bind](https://fishshell.com/docs/current/cmds/bind.html):

```
# Just clear the commandline on control-c
bind \cc 'commandline -r ""'

```

Put `bind` statements into [config.fish](https://fishshell.com/docs/current/language.html#configuration) or a function called `fish_user_key_bindings`.

If you change your mind on a binding and want to go back to fish’s default, you can simply erase it again:

```
bind --erase \cc

```

Fish remembers its preset bindings and so it will take effect again. This saves you from having to remember what it was before and add it again yourself.

If you use [vi bindings](https://fishshell.com/docs/current/interactive.html#vi-mode), note that `bind` will by default bind keys in [command mode](https://fishshell.com/docs/current/interactive.html#vi-mode-command). To bind something in [insert mode](https://fishshell.com/docs/current/interactive.html#vi-mode-insert):

```
bind --mode insert \cc 'commandline -r ""'

```



#### Key sequences

The terminal tells fish which keys you pressed by sending some sequences of bytes to describe that key. For some keys, this is easy - pressing a simply means the terminal sends “a”. In others it’s more complicated and terminals disagree on which they send.

In these cases, [fish_key_reader](https://fishshell.com/docs/current/cmds/fish_key_reader.html) can tell you how to write the key sequence for your terminal. Just start it and press the keys you are interested in:

```
> fish_key_reader # pressing control-c
Press a key:
Press [ctrl-C] again to exit
bind \cC 'do something'

> fish_key_reader # pressing the right-arrow
Press a key:
bind \e\[C 'do something'

```

Note that some key combinations are indistinguishable or unbindable. For instance control-i *is the same* as the tab key. This is a terminal limitation that fish can’t do anything about. When `fish_key_reader` prints the same sequence for two different keys, then that is because your terminal sends the same sequence for them.

Also, Escape is the same thing as Alt in a terminal. To distinguish between pressing Escape and then another key, and pressing Alt and that key (or an escape sequence the key sends), fish waits for a certain time after seeing an escape character. This is configurable via the [`fish_escape_delay_ms`](https://fishshell.com/docs/current/language.html#envvar-fish_escape_delay_ms) variable.

If you want to be able to press Escape and then a character and have it count as Alt+that character, set it to a higher value, e.g.:

```
set -g fish_escape_delay_ms 100

```

Similarly, to disambiguate *other* keypresses where you’ve bound a subsequence and a longer sequence, fish has [`fish_sequence_key_delay_ms`](https://fishshell.com/docs/current/language.html#envvar-fish_sequence_key_delay_ms):

```
# This binds "jk" to switch to normal mode in vi-mode.
# If you kept it like that, every time you press "j",
# fish would wait for a "k" or other key to disambiguate
bind -M insert -m default jk cancel repaint-mode

# After setting this, fish only waits 200ms for the "k",
# or decides to treat the "j" as a separate sequence, inserting it.
set -g fish_sequence_key_delay_ms 200

```



### Copy and paste (Kill Ring)

Fish uses an Emacs-style kill ring for copy and paste functionality. For example, use Control+K (kill-line) to cut from the current cursor position to the end of the line. The string that is cut (a.k.a. killed in emacs-ese) is inserted into a list of kills, called the kill ring. To paste the latest value from the kill ring (emacs calls this “yanking”) use Control+Y (the `yank` input function). After pasting, use Alt+Y (`yank-pop`) to rotate to the previous kill.

Copy and paste from outside are also supported, both via the Control+X / Control+V bindings (the `fish_clipboard_copy` and `fish_clipboard_paste` functions [[2\]](https://fishshell.com/docs/current/interactive.html#id8)) and via the terminal’s paste function, for which fish enables “Bracketed Paste Mode”, so it can tell a paste from manually entered text. In addition, when pasting inside single quotes, pasted single quotes and backslashes are automatically escaped so that the result can be used as a single token simply by closing the quote after. Kill ring entries are stored in `fish_killring` variable.

The commands `begin-selection` and `end-selection` (unbound by default; used for selection in vi visual mode) control text selection together with cursor movement commands that extend the current selection. The variable [`fish_cursor_selection_mode`](https://fishshell.com/docs/current/language.html#envvar-fish_cursor_selection_mode) can be used to configure if that selection should include the character under the cursor (`inclusive`) or not (`exclusive`). The default is `exclusive`, which works well with any cursor shape. For vi mode, and particularly for the `block` or `underscore` cursor shapes you may prefer `inclusive`.

[[2](https://fishshell.com/docs/current/interactive.html#id7)] 

These rely on external tools. Currently xsel, xclip, wl-copy/wl-paste and pbcopy/pbpaste are supported.



### Multiline editing

The fish commandline editor can be used to work on commands that are several lines long. There are three ways to make a command span more than a single line:

- Pressing the Enter key while a block of commands is unclosed, such as when one or more block commands such as `for`, `begin` or `if` do not have a corresponding [end](https://fishshell.com/docs/current/cmds/end.html) command.
- Pressing Alt+Enter instead of pressing the Enter key.
- By inserting a backslash (`\`) character before pressing the Enter key, escaping the newline.

The fish commandline editor works exactly the same in single line mode and in multiline mode. To move between lines use the left and right arrow keys and other such keyboard shortcuts.



### Searchable command history

After a command has been executed, it is remembered in the history list. Any duplicate history items are automatically removed. By pressing the up and down keys, you can search forwards and backwards in the history. If the current command line is not empty when starting a history search, only the commands containing the string entered into the command line are shown.

By pressing Alt+↑ and Alt+↓, a history search is also performed, but instead of searching for a complete commandline, each commandline is broken into separate elements just like it would be before execution, and the history is searched for an element matching that under the cursor.

For more complicated searches, you can press Ctrl+R to open a pager that allows you to search the history. It shows a limited number of entries in one page, press Ctrl+R [[3\]](https://fishshell.com/docs/current/interactive.html#id11) again to move to the next page and Ctrl+S [[4\]](https://fishshell.com/docs/current/interactive.html#id12) to move to the previous page. You can change the text to refine your search.

History searches are case-insensitive unless the search string contains an uppercase character. You can stop a search to edit your search string by pressing Esc or Page Down.

Prefixing the commandline with a space will prevent the entire line from being stored in the history. It will still be available for recall until the next command is executed, but will not be stored on disk. This is to allow you to fix misspellings and such.

The command history is stored in the file `~/.local/share/fish/fish_history` (or `$XDG_DATA_HOME/fish/fish_history` if that variable is set) by default. However, you can set the `fish_history` environment variable to change the name of the history session (resulting in a `<session>_history` file); both before starting the shell and while the shell is running.

See the [history](https://fishshell.com/docs/current/cmds/history.html) command for other manipulations.

Examples:

To search for previous entries containing the word ‘make’, type `make` in the console and press the up key.

If the commandline reads `cd m`, place the cursor over the `m` character and press Alt+↑ to search for previously typed words containing ‘m’.

[[3](https://fishshell.com/docs/current/interactive.html#id9)] 

Or another binding that triggers the `history-pager` input function. See [bind](https://fishshell.com/docs/current/cmds/bind.html) for a list.

[[4](https://fishshell.com/docs/current/interactive.html#id10)] 

Or another binding that triggers the `pager-toggle-search` input function.

## Navigating directories

Navigating directories is usually done with the [cd](https://fishshell.com/docs/current/cmds/cd.html) command, but fish offers some advanced features as well.

The current working directory can be displayed with the [pwd](https://fishshell.com/docs/current/cmds/pwd.html) command, or the `$PWD` [special variable](https://fishshell.com/docs/current/language.html#variables-special). Usually your prompt already does this.

### Directory history

Fish automatically keeps a trail of the recent visited directories with [cd](https://fishshell.com/docs/current/cmds/cd.html) by storing this history in the `dirprev` and `dirnext` variables.

Several commands are provided to interact with this directory history:

- [dirh](https://fishshell.com/docs/current/cmds/dirh.html) prints the history
- [cdh](https://fishshell.com/docs/current/cmds/cdh.html) displays a prompt to quickly navigate the history
- [prevd](https://fishshell.com/docs/current/cmds/prevd.html) moves backward through the history. It is bound to Alt+←
- [nextd](https://fishshell.com/docs/current/cmds/nextd.html) moves forward through the history. It is bound to Alt+→



### Directory stack

Another set of commands, usually also available in other shells like bash, deal with the directory stack. Stack handling is not automatic and needs explicit calls of the following commands:

- [dirs](https://fishshell.com/docs/current/cmds/dirs.html) prints the stack
- [pushd](https://fishshell.com/docs/current/cmds/pushd.html) adds a directory on top of the stack and makes it the current working directory
- [popd](https://fishshell.com/docs/current/cmds/popd.html) removes the directory on top of the stack and changes the current working directory