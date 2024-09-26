+++
title = "文件和目录管理"
date = 2024-09-26T08:39:26+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

## cd

更改当前工作目录。
更多信息：https://manned.org/cd.

 - 转到指定目录：
   cd path/to/directory

 - 转到当前目录的父目录：
   cd ..

 - 转到当前用户的主（home）目录：
   cd

 - 转到指定用户的主（home）目录：
   cd ~username

 - 转到刚才选择的目录：
   cd -

 - 转到根目录：
   cd /

## touch

创建文件并设置访问/修改时间。
更多信息：https://manned.org/touch.

 - 创建指定的文件：
   touch path/to/file1 path/to/file2 ...

 - 将文件的访问(a)或修改时间(m)设置为当前时间，如果文件不存在则不创建(-c)：
   touch -c -a|m path/to/file1 path/to/file2 ...

 - 将文件时间(-t)设置为指定值，如果文件不存在则不创建(-c)：
   touch -c -t YYYYMMDDHHMM.SS path/to/file1 path/to/file2 ...

 - 将文件时间设置为另一文件(-r,即文件3)的时间，如果文件不存在则不创建(-c)：
   touch -c -r path/to/reference_file path/to/file1 path/to/file2 ...

## mkdir

创建目录并设置其权限。
更多信息：https://www.gnu.org/software/coreutils/mkdir.

 - 创建特定目录：
   mkdir path/to/directory1 path/to/directory2 ...

 - 根据需要创建特定目录及其父目录：
   mkdir -p|--parents path/to/directory1 path/to/directory2 ...

 - 创建具有特定权限的目录：
   mkdir -m|--mode rwxrw-r-- path/to/directory1 path/to/directory2 ...

## pwd

Print name of current/working directory.
More information: https://www.gnu.org/software/coreutils/pwd.

 - Print the current directory:
   pwd

 - Print the current directory, and resolve all symlinks (i.e. show the "physical" path):
   pwd -P

## find

在指定目录树下递归查找文件或目录。
更多信息：https://manned.org/find.

 - 通过扩展名查找文件：
   
   ```sh
   find root_path -name '*.ext'
   ```
   
   
   
 - 查找匹配多个路径或名称模式的文件：
   
   ```sh
   find root_path -path '**/path/**/*.ext' -or -name '*pattern*'
   ```
   
   
   
 - 查找匹配指定名称的目录，不区分大小写：
   
   ```sh
   find root_path -type d -iname '*lib*'
   ```
   
   
   
 - 查找匹配指定模式的文件，排除特定路径：
   
   ```sh
   find root_path -name '*.py' -not -path '*/site-packages/*'
   ```
   
   
   
 - 查找符合指定大小范围的文件，将递归深度限制为 "1"：
   
   ```sh
   find root_path -maxdepth 1 -size +500k -size -10M
   ```
   
   
   
 - 对每个文件运行命令（在命令中使用 {} 代表当前文件）：
   
   ```sh
   find root_path -name '*.ext' -exec {{wc -l {} }}\;
   ```
   
   
   
 - 查找最近 7 天修改的文件：
   find root_path -daystart -mtime -7

 - 查找空（0 字节）的文件并删除：
   find root_path -type f -empty -delete

## more

打开一个文件进行交互式阅读，允许滚动和搜索。
更多信息：https://manned.org/more.1p.

 - 打开一个文件：
   more 路径/到/文件

 - 打开一个文件，从特定行开始显示：
   more +行号 路径/到/文件

 - 显示帮助：
   more --help

 - 转到下一页：
   <空格>

 - 搜索一个字符串（按 n 键跳转到下一个匹配）:
   /字符串

 - 退出：
   q

 - 显示关于交互式命令的帮助：
   h

## less

Open a file for interactive reading, allowing scrolling and search.
More information: https://greenwoodsoftware.com/less/.

 - Open a file:
   less source_file

 - Page down/up:
   <Space> (down), b (up)

 - Go to end/start of file:
   G (end), g (start)

 - Forward search for a string (press n/N to go to next/previous match):
   /something

 - Backward search for a string (press n/N to go to next/previous match):
   ?something

 - Follow the output of the currently opened file:
   F

 - Open the current file in an editor:
   v

 - Exit:
   q

## vi

这是 vim 命令的一个别名。

 - 原命令的文档在：
   tldr vim

## vim

Vi IMproved，一个程序员的文本编辑器，提供为不同类型的文档修改设计的多种模式。
按 i 进入插入模式。<Esc> 返回正常模式，正常模式允许使用 Vim 命令。
更多信息：https://www.vim.org.

 - 打开文档：
   vim 文件

 - 打开文件的指定行数：
   vim +行数 文件

 - 查看 Vim 的使用说明：
   :help<Enter>

 - 保存并退出：
   :wq<Enter>

 - 撤销上一个操作：
   u

 - 用特征（pattern）在文件中搜寻，按下 n/N 切换至上 / 下一个结果：
   /特征<Enter>

 - 对整个文件使用正则表达式进行替换：
   :%s/正则表达式/替换字/g<Enter>

 - 显示行号：
   :set nu<Enter>

## ls

列出目录中的内容。
更多信息：https://www.gnu.org/software/coreutils/ls.

 - 列出目录中的文件，每个文件占一行：
   ls -1

 - 列出包含隐藏文件的所有文件：
   ls -a

 - 列出所有文件，如果是目录，则在目录名后面加上「/」：
   ls -F

 - 列出包含隐藏文件的所有文件信息，包括权限，所有者，大小和修改日期：
   ls -la

 - 列出所有文件信息，大小用人类可读的单位表示（KiB, MiB, GiB）：
   ls -lh

 - 列出所有文件信息，按大小降序排序：
   ls -lS

 - 列出所有文件信息，按修改日期从旧到新排序：
   ls -ltr

 - 只列出目录：
   ls -d */

## ll



## cat

打印和拼接文件的工具。
更多信息：https://manned.org/cat.1posix.

 - 以标准输出，打印文件内容：
   cat path/to/file

 - 多文件合并到目标文件：
   cat path/to/file1 path/to/file2 ... > target_file

 - 多文件合并，并追加到目标文件：
   cat path/to/file1 path/to/file2 ... >> target_file

## head

输出文件的开头部分。
更多信息：https://keith.github.io/xcode-man-pages/head.1.html.

 - 输出文件的前几行：
   head -n 行数 文件名

 - 输出文件的前几个字节：
   head -c 字节数 文件名

## tail

Display the last part of a file.
See also: head.
More information: https://www.gnu.org/software/coreutils/tail.

 - Show last 'count' lines in file:
   tail --lines count path/to/file

 - Print a file from a specific line number:
   tail --lines +count path/to/file

 - Print a specific count of bytes from the end of a given file:
   tail --bytes count path/to/file

 - Print the last lines of a given file and keep reading it until Ctrl + C:
   tail --follow path/to/file

 - Keep reading file until Ctrl + C, even if the file is inaccessible:
   tail --retry --follow path/to/file

 - Show last 'num' lines in 'file' and refresh every 'n' seconds:
   tail --lines count --sleep-interval seconds --follow path/to/file

## cp

复制文件和文件夹。
更多信息：https://www.gnu.org/software/coreutils/cp.



- Copy a file to another location:将文件复制到另一个位置:

```sh
cp path/to/source_file.ext path/to/target_file.ext
```

- Copy a file into another directory, keeping the filename:复制一个文件到另一个目录，保持文件名:

```sh
cp path/to/source_file.ext path/to/target_parent_directory
```

- Recursively copy a directory's contents to another location (if the destination exists, the directory is copied inside it):递归地将目录的内容复制到另一个位置(如果目标存在，则将目录复制到其中):

```sh
cp -R path/to/source_directory path/to/target_directory
```

- Copy a directory recursively, in verbose mode (shows files as they are copied):以详细模式递归地复制目录(在复制时显示文件):

```sh
cp -vR path/to/source_directory path/to/target_directory
```

- Copy multiple files at once to a directory:一次复制多个文件到一个目录:

```sh
cp -t path/to/destination_directory path/to/file1 path/to/file2 ...
```

- Copy text files to another location, in interactive mode (prompts user before overwriting):以交互模式将文本文件复制到另一个位置(在覆盖之前提示用户):

```sh
cp -i *.txt path/to/target_directory
```

- Follow symbolic links before copying:复制前遵循符号链接:

```sh
cp -L link path/to/target_directory
```

- Use the first argument as the destination directory (useful for `xargs ... | cp -t <DEST_DIR>`):使用第一个参数作为目标目录(对于 `xargs ... | cp -t <DEST_DIR>` 很有用):

```sh
cp -t path/to/target_directory path/to/file_or_directory1 path/to/file_or_directory2 ...
```

## mv

移动或重命名文件或目录。
更多信息：https://www.gnu.org/software/coreutils/mv.

- Rename a file or directory when the target is not an existing directory:当目标目录不存在时，重命名文件或目录。

```sh
mv path/to/source path/to/target
```

- Move a file or directory into an existing directory:将文件或目录移动到现有目录中:

```sh
mv path/to/source path/to/existing_directory
```

- Move multiple files into an existing directory, keeping the filenames unchanged:将多个文件移动到现有目录中，保持文件名不变:

```sh
mv path/to/source1 path/to/source2 ... path/to/existing_directory
```

- Do not prompt (**f**) for confirmation before overwriting existing files:在覆盖现有文件之前，不要提示(f)进行确认;

```sh
mv --force path/to/source path/to/target
```

- Prompt for confirmation **i**nteractively before overwriting existing files, regardless of file permissions:在覆盖现有文件之前交互式提示确认，无论文件权限如何:

```sh
mv --interactive path/to/source path/to/target
```

- Do not overwrite (**n**) existing files at the target:不要覆盖(n)目标中的现有文件:

```sh
mv --no-clobber path/to/source path/to/target
```

- Move files in **v**erbose mode, showing files after they are moved:以详细模式移动文件，显示移动后的文件:

```sh
mv --verbose path/to/source path/to/target
```

- Specify **t**arget directory so that you can use external tools to gather movable files:指定目标目录，以便您可以使用外部工具收集可移动文件:

```sh
find /var/log -type f -name '*.log' -print0 | xargs -0 mv --target-directory path/to/target_directory
```

## rm

删除文件或目录。
更多信息：https://www.gnu.org/software/coreutils/rm.

- Remove specific files: 删除特定文件:

```sh
rm path/to/file1 path/to/file2 ...
```

- Remove specific files ignoring nonexistent ones:删除特定文件，忽略不存在的文件:

```sh
rm -f path/to/file1 path/to/file2 ...
```

- Remove specific files interactively prompting before each removal:删除特定文件时，每次删除前都会交互式提示:

```sh
rm -i path/to/file1 path/to/file2 ...
```

- Remove specific files printing info about each removal:删除特定文件，打印每次删除的信息:

```sh
rm -v path/to/file1 path/to/file2 ...
```

- Remove specific files and directories recursively:递归删除特定的文件和目录:

```sh
rm -r path/to/file_or_directory1 path/to/file_or_directory2 ...
```

## diff

Compare files and directories. More information: https://manned.org/diff.

比较文件和目录。 更多信息:https://manned.org/diff。

- Compare files (lists changes to turn `old_file` into `new_file`):

  比较文件(列出将 `old_file` 变为 `new_file` 的更改):

```sh
diff old_file new_file
```

- Compare files, ignoring white spaces:

  比较文件，忽略空白:

```sh
diff -w|--ignore-all-space old_file new_file
```

- Compare files, showing the differences side by side:比较文件，并排显示差异:

```sh
diff -y|--side-by-side old_file new_file
```

- Compare files, showing the differences in unified format (as used by `git diff`):

  比较文件，显示统一格式的差异(如 `git diff` 使用):

```sh
diff -u|--unified old_file new_file
```

- Compare directories recursively (shows names for differing files/directories as well as changes made to files):

  递归比较目录(显示不同文件/目录的名称以及对文件的更改):

```sh
diff -r|--recursive old_directory new_directory
```

- Compare directories, only showing the names of files that differ:

  比较目录，只显示不同的文件名:

```sh
diff -r|--recursive -q|--brief old_directory new_directory
```

- Create a patch file for Git from the differences of two text files, treating nonexistent files as empty:

  根据两个文本文件的差异为Git创建一个补丁文件，将不存在的文件视为空文件:

```sh
diff -a|--text -u|--unified -N|--new-file old_file new_file > diff.patch
```

- Compare files, showing output in color and try hard to find smaller set of changes:

  比较文件，以颜色显示输出，并努力找到较小的更改集:

```sh
diff -d|--minimal --color=always old_file new_file
```

## locate

Find filenames quickly. More information: https://manned.org/locate.

快速查找文件名。 更多信息:https://manned.org/locate。

- Look for pattern in the database. Note: the database is recomputed periodically (usually weekly or daily):

  在数据库中寻找模式。注:数据库定期重新计算(通常是每周或每天):

```sh
locate pattern
```

- Look for a file by its exact filename (a pattern containing no globbing characters is interpreted as `*pattern*`):

  根据文件的确切文件名查找文件(不包含globbing字符的模式被解释为 `*pattern*` ):

```sh
locate '*/filename'
```

- Recompute the database. You need to do it if you want to find recently added files:

  重新计算数据库。如果你想找到最近添加的文件，你需要这样做:

```sh
sudo updatedb
```

## whereis

> Locate the binary, source, and manual page files for a command. More information: https://manned.org/whereis.
>
> 找到命令的二进制文件、源文件和手册页文件。 更多信息:https://manned.org/whereis。

- Locate binary, source and man pages for SSH:

  找到SSH的二进制文件、源代码和手册页:

```sh
whereis ssh
```

- Locate binary and man pages for ls:

  找到ls的二进制文件和手册页:

```sh
whereis -bm ls
```

- Locate source of gcc and man pages for Git:

  找到gcc的源代码和Git的手册页:

```sh
whereis -s gcc -m git
```

- Locate binaries for gcc in `/usr/bin/` only:

  只在 `/usr/bin/` 中找到gcc的二进制文件:

```sh
whereis -b -B /usr/bin/ -f gcc
```

- Locate unusual binaries (those that have more or less than one binary on the system):

  定位不寻常的二进制文件(那些在系统中有多个或少于一个二进制文件的二进制文件):

```sh
whereis -u *
```

- Locate binaries that have unusual manual entries (binaries that have more or less than one manual installed):

  查找具有不寻常的手动条目的二进制文件(安装了多个或少于一个手动条目的二进制文件):

```sh
whereis -u -m *
```

## which

> Locate a program in the user's path. More information: https://manned.org/which.
>
> 定位用户路径中的程序。 更多信息:https://manned.org/which。

- Search the PATH environment variable and display the location of any matching executables:

  搜索PATH环境变量并显示任何匹配的可执行文件的位置:

```sh
which executable
```

- If there are multiple executables which match, display all:

  如果有多个匹配的可执行文件，显示全部:

```sh
which -a executable
```

## grep

> Find patterns in files using regular expressions. More information: https://www.gnu.org/software/grep/manual/grep.html.
>
> 使用正则表达式查找文件中的模式。 更多信息:https://www.gnu.org/software/grep/manual/grep.html。

- Search for a pattern within a file:

  在文件中搜索模式:

```sh
grep "search_pattern" path/to/file
```

- Search for an exact string (disables regular expressions):

  搜索精确字符串(禁用正则表达式):

```sh
grep -F|--fixed-strings "exact_string" path/to/file
```

- Search for a pattern in all files recursively in a directory, showing line numbers of matches, ignoring binary files:

  在目录中递归地搜索所有文件中的模式，显示匹配的行号，忽略二进制文件:

```sh
grep -r|--recursive -n|--line-number --binary-files without-match "search_pattern" path/to/directory
```

- Use extended regular expressions (supports `?`, `+`, `{}`, `()` and `|`), in case-insensitive mode:

  在不区分大小写的模式下使用扩展正则表达式(支持 `?` 、 `+` 、 `{}` 、 `()` 和 `|` ):

```sh
grep -E|--extended-regexp -i|--ignore-case "search_pattern" path/to/file
```

- Print 3 lines of context around, before, or after each match:

  在每次匹配前后打印3行上下文:

```sh
grep --context|before-context|after-context 3 "search_pattern" path/to/file
```

- Print file name and line number for each match with color output:

  打印文件名和行号为每个匹配的颜色输出:

```sh
grep -H|--with-filename -n|--line-number --color=always "search_pattern" path/to/file
```

- Search for lines matching a pattern, printing only the matched text:

  搜索与模式匹配的行，只打印匹配的文本:

```sh
grep -o|--only-matching "search_pattern" path/to/file
```

- Search `stdin` for lines that do not match a pattern:

  搜索 `stdin` 不匹配的行:

```sh
cat path/to/file | grep -v|--invert-match "search_pattern"
```

## sort

> Sort lines of text files. More information: https://www.gnu.org/software/coreutils/sort.
>
> 对文本文件行进行排序。 更多信息:https://www.gnu.org/software/coreutils/sort。

- Sort a file in ascending order:

  按升序对文件进行排序:

```sh
sort path/to/file
```

- Sort a file in descending order:

  按降序对文件进行排序:

```sh
sort --reverse path/to/file
```

- Sort a file in case-insensitive way:

  以不区分大小写的方式对文件进行排序:

```sh
sort --ignore-case path/to/file
```

- Sort a file using numeric rather than alphabetic order:

  使用数字而不是字母顺序对文件进行排序:

```sh
sort --numeric-sort path/to/file
```

- Sort `/etc/passwd` by the 3rd field of each line numerically, using ":" as a field separator:

  对 `/etc/passwd` 按每行的第三个字段进行数字排序，使用":"作为字段分隔符:

```sh
sort --field-separator=: --key=3n /etc/passwd
```

- As above, but when items in the 3rd field are equal, sort by the 4th field by numbers with exponents:

  如上所述，但当第3个字段中的项相等时，按第4个字段按指数排序:

```sh
sort -t : -k 3,3n -k 4,4g /etc/passwd
```

- Sort a file preserving only unique lines:

  对只保留唯一行的文件进行排序:

```sh
sort --unique path/to/file
```

- Sort a file, printing the output to the specified output file (can be used to sort a file in-place):

  对文件进行排序，将输出打印到指定的输出文件(可用于对文件进行就地排序):

```sh
sort --output=path/to/file path/to/file
```

## zip

> Package and compress (archive) files into a Zip archive. See also: `unzip`. More information: https://manned.org/zip.打包并压缩(存档)文件到Zip存档。 参见: `unzip` 。 更多信息:https://manned.org/zip。

- Add files/directories to a specific archive (**r**ecursively):

  将文件/目录添加到特定的存档(递归):

```sh
zip -r path/to/compressed.zip path/to/file_or_directory1 path/to/file_or_directory2 ...
```

- Remove files/directories from a specific archive (**d**elete):

  从一个特定的存档中删除文件/目录(delete):

```sh
zip -d path/to/compressed.zip path/to/file_or_directory1 path/to/file_or_directory2 ...
```

- Archive files/directories e**x**cluding specified ones:

  存档文件/目录，不包括指定文件/目录:

```sh
zip -r path/to/compressed.zip path/to/file_or_directory1 path/to/file_or_directory2 ... -x path/to/excluded_files_or_directories
```

- Archive files/directories with a specific compression level (`0` - the lowest, `9` - the highest):

  以特定的压缩级别归档文件/目录( `0` -最低， `9` -最高):

```sh
zip -r -0..9 path/to/compressed.zip path/to/file_or_directory1 path/to/file_or_directory2 ...
```

- Create an **e**ncrypted archive with a specific password:

  使用指定密码创建加密归档文件:

```sh
zip -r -e path/to/compressed.zip path/to/file_or_directory1 path/to/file_or_directory2 ...
```

- Archive files/directories to a multi-part **s**plit Zip archive (e.g. 3 GB parts):

  将文件/目录归档到多部分拆分Zip归档(例如3gb的部分):

```sh
zip -r -s 3g path/to/compressed.zip path/to/file_or_directory1 path/to/file_or_directory2 ...
```

- Print a specific archive contents:

  打印特定的存档内容:

```sh
zip -sf path/to/compressed.zip
```

## gzip

> Compress/uncompress files with `gzip` compression (LZ77). More information: https://www.gnu.org/software/gzip/manual/gzip.html.
>
> 压缩/解压缩 `gzip` 压缩文件(LZ77)。 更多信息:https://www.gnu.org/software/gzip/manual/gzip.html。

- Compress a file, replacing it with a `gzip` archive:

  压缩文件，将其替换为 `gzip` 归档文件:

```sh
gzip path/to/file
```

- Decompress a file, replacing it with the original uncompressed version:

  解压缩文件，将其替换为原始未压缩版本:

```sh
gzip -d|--decompress path/to/file.gz
```

- Compress a file, keeping the original file:

  压缩文件，保留原始文件:

```sh
gzip -k|--keep path/to/file
```

- Compress a file, specifying the output filename:

  压缩文件，指定输出文件名:

```sh
gzip -c|--stdout path/to/file > path/to/compressed_file.gz
```

- Decompress a `gzip` archive specifying the output filename:

  解压缩 `gzip` 文件，指定输出文件名:

```sh
gzip -c|--stdout -d|--decompress path/to/file.gz > path/to/uncompressed_file
```

- Specify the compression level. 1 is the fastest (low compression), 9 is the slowest (high compression), 6 is the default:

  指定压缩级别。1是最快的(低压缩)，9是最慢的(高压缩)，6是默认值:

```sh
gzip -1..9 -c|--stdout path/to/file > path/to/compressed_file.gz
```

- Display the name and reduction percentage for each file compressed or decompressed:

  显示每个压缩或解压缩文件的名称和压缩百分比。

```sh
gzip -v|--verbose -d|--decompress path/to/file.gz
```

## compress

> Compress files using the Unix `compress` command. More information: https://manned.org/compress.1.
>
> 使用Unix `compress` 命令压缩文件。 更多信息:https://manned.org/compress.1。

- Compress specific files: 

  压缩特定文件:

```sh
compress path/to/file1 path/to/file2 ...
```

- Compress specific files, ignore non-existent ones:

  压缩特定文件，忽略不存在的文件:

```sh
compress -f path/to/file1 path/to/file2 ...
```

- Specify the maximum compression bits (9-16 bits):

  指定最大压缩位(9-16位):

```sh
compress -b bits
```

- Write to `stdout` (no files are changed):

  写入 `stdout` (不修改文件):

```sh
compress -c path/to/file
```

- Decompress files (functions like `uncompress`):

  解压缩文件(函数如 `uncompress` ):

```sh
compress -d path/to/file
```

- Display compression percentage:

  显示压缩百分比:

```sh
compress -v path/to/file
```

## bzip2

> A block-sorting file compressor. More information: https://manned.org/bzip2.
>
> 一个块排序文件压缩器。 更多信息:https://manned.org/bzip2。

- Compress a file: 

  压缩文件:

```sh
bzip2 path/to/file_to_compress
```

- **d**ecompress a file: 

  解压缩文件:

```sh
bzip2 -d path/to/compressed_file.bz2
```

- **d**ecompress a file to `stdout`:

  解压缩文件到 `stdout` :

```sh
bzip2 -dc path/to/compressed_file.bz2
```

- Test the integrity of each file inside the archive file:

  测试归档文件中每个文件的完整性:

```sh
bzip2 --test path/to/compressed_file.bz2
```

- Show the compression ratio for each file processed with detailed information:

  显示已处理的每个文件的压缩比，并提供详细信息:

```sh
bzip2 --verbose path/to/compressed_files.bz2
```

- Decompress a file overwriting existing files:

  解压缩覆盖现有文件的文件:

```sh
bzip2 --force path/to/compressed_file.bz2
```

- Display help:

  显示帮助:

```sh
bzip2 -h
```

## unzip

> Extract files/directories from Zip archives. See also: `zip`. More information: https://manned.org/unzip.
>
> 从Zip档案中提取文件/目录。 参见: `zip` 。 更多信息:https://manned.org/unzip。

- Extract all files/directories from specific archives into the current directory:

  将指定存档中的所有文件/目录解压缩到当前目录中:

```sh
unzip path/to/archive1.zip path/to/archive2.zip ...
```

- Extract files/directories from archives to a specific path:

  从归档中提取文件/目录到指定路径:

```sh
unzip path/to/archive1.zip path/to/archive2.zip ... -d path/to/output
```

- Extract files/directories from archives to `stdout`:

  从归档中提取文件/目录到 `stdout` :

```sh
unzip -c path/to/archive1.zip path/to/archive2.zip ...
```

- Extract the contents of the file(s) to `stdout` alongside the extracted file names:

  将文件的内容提取到 `stdout` 和提取的文件名旁边:

```sh
unzip -O gbk path/to/archive1.zip path/to/archive2.zip ...
```

- List the contents of a specific archive without extracting them:

  列出特定存档的内容而不提取它们:

```sh
unzip -l path/to/archive.zip
```

- Extract a specific file from an archive:

  从存档中提取一个特定的文件:

```sh
unzip -j path/to/archive.zip path/to/file1_in_archive path/to/file2_in_archive ...
```

## gunzip

> Extract files from a `gzip` (`.gz`) archive. More information: https://manned.org/gunzip.
>
> 从 `gzip` ( `.gz` )归档文件中提取文件。 更多信息:https://manned.org/gunzip。

- Extract a file from an archive, replacing the original file if it exists:

  从存档中提取文件，如果原文件存在，则替换原文件:

```sh
gunzip archive.tar.gz
```

- Extract a file to a target destination:

  将文件解压缩到目标目的地:

```sh
gunzip --stdout archive.tar.gz > archive.tar
```

- Extract a file and keep the archive file:

  提取一个文件并保留存档文件:

```sh
gunzip --keep archive.tar.gz
```

- List the contents of a compressed file:

  列出压缩文件的内容:

```sh
gunzip --list file.txt.gz
```

- Decompress an archive from `stdin`:

  从 `stdin` 解压存档文件:

```sh
cat path/to/archive.gz | gunzip
```

## uncompress

> Uncompress files compressed using the Unix `compress` command. More information: https://manned.org/uncompress.1.
>
> 使用Unix `compress` 命令解压压缩的文件。 更多信息:https://manned.org/uncompress.1。

- Uncompress specific files:

  解压缩特定文件:

```sh
uncompress path/to/file1.Z path/to/file2.Z ...
```

- Uncompress specific files while ignoring non-existent ones:

  解压缩特定文件，忽略不存在的文件:

```sh
uncompress -f path/to/file1.Z path/to/file2.Z ...
```

- Write to `stdout` (no files are changed and no `.Z` files are created):

  写入 `stdout` (不修改文件，不创建 `.Z` 文件):

```sh
uncompress -c path/to/file1.Z path/to/file2.Z ...
```

- Verbose mode (write to `stderr` about percentage reduction or expansion):

  详细模式(写入 `stderr` 关于百分比减少或扩展):

```sh
uncompress -v path/to/file1.Z path/to/file2.Z ...
```

## bunzip2



## tar

> Archiving utility. Often combined with a compression method, such as `gzip` or `bzip2`. More information: https://www.gnu.org/software/tar.
>
> 归档工具。 通常与压缩方法结合使用，如 `gzip` 或 `bzip2` 。 更多信息:https://www.gnu.org/software/tar。

- **c**reate an archive and write it to a **f**ile:

  创建一个归档文件并将其写入文件:

```sh
tar cf path/to/target.tar path/to/file1 path/to/file2 ...
```

- **c**reate a g**z**ipped archive and write it to a **f**ile:

  创建一个gzip压缩的归档文件并将其写入文件:

```sh
tar czf path/to/target.tar.gz path/to/file1 path/to/file2 ...
```

- **c**reate a g**z**ipped archive from a directory using relative paths:

  使用相对路径从目录创建一个gzip归档文件:

```sh
tar czf path/to/target.tar.gz --directory=path/to/directory .
```

- E**x**tract a (compressed) archive **f**ile into the current directory **v**erbosely:

  详细提取(压缩)归档文件到当前目录:

```sh
tar xvf path/to/source.tar[.gz|.bz2|.xz]
```

- E**x**tract a (compressed) archive **f**ile into the target directory:

  解压(压缩)归档文件到目标目录:

```sh
tar xf path/to/source.tar[.gz|.bz2|.xz] --directory=path/to/directory
```

- **c**reate a compressed archive and write it to a **f**ile, using the file extension to **a**utomatically determine the compression program:

  创建一个压缩归档并写入文件，使用文件扩展名自动确定压缩程序:

```sh
tar caf path/to/target.tar.xz path/to/file1 path/to/file2 ...
```

- Lis**t** the contents of a tar **f**ile **v**erbosely:

  详细列出tar文件的内容:

```sh
tar tvf path/to/source.tar
```

- E**x**tract files matching a pattern from an archive **f**ile:

  从归档文件中提取匹配模式的文件:

```sh
tar xf path/to/source.tar --wildcards "*.html"
```

