+++
title = "lynx"
date = 2024-10-11T22:18:42+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

https://manpages.ubuntu.com/manpages/noble/en/man1/lynx.1.html

#### **NAME**

```
       lynx - a general purpose distributed information browser for the World Wide Web
```

#### **SYNOPSIS**

```
       lynx [options] [optional paths or URLs]

       lynx [options] [path or URL] -get_data
       data
       --

       lynx [options] [path or URL] -post_data
       data
       --

       Use “lynx -help” to display a complete list of current options.
```

#### **DESCRIPTION**

```
       Lynx is a fully-featured World Wide Web (WWW) client for users running cursor-addressable,
       character-cell display devices (e.g., vt100 terminals, vt100 emulators running on  Windows
       or any POSIX platform, or any other “curses-oriented” display).  It will display hypertext
       markup language (HTML) documents containing links to files residing on the  local  system,
       as  well  as  files  residing  on remote systems running Gopher, HTTP, FTP, WAIS, and NNTP
       servers.

       Lynx has been ported to many systems, including  all  variants  of  Unix,  Windows  (since
       Windows 95), DOS DJGPP and OS/2, as well as VMS and OS/390.

       Lynx  can  be  used  to  access information on the World Wide Web, or to build information
       systems intended primarily for local access.  For example, Lynx has  been  used  to  build
       several  Campus  Wide  Information Systems (CWIS).  In addition, Lynx can be used to build
       systems isolated within a single LAN.
```

#### **OPTIONS**

```
       At start up, Lynx will load any local file or remote URL specified at  the  command  line.
       For  help  with  URLs, press “?”  or “H” while running Lynx.  Then follow the link titled,
       “Help on URLs.”

       If more than one local file or remote URL is listed on the command line,  Lynx  will  open
       only  the last interactively.  All of the names (local files and remote URLs) are added to
       the G)oto history.

       Lynx uses only long option names.  Option names can begin with double dash “--”  as  well,
       underscores  and dashes can be intermixed in option names (in the reference below, options
       are shown with one dash “-” before them, and with underscores “_”).

       Lynx provides many command-line options.  Some options require a value (string, number  or
       keyword).   These  are noted in the reference below.  The other options set boolean values
       in the program.  There are three types of boolean options: set, unset and toggle.   If  no
       option value is given, these have the obvious meaning: set (to true), unset (to false), or
       toggle (between true/false).  For any  of  these,  an  explicit  value  can  be  given  in
       different forms to allow for operating system constraints, e.g.,

           -center:off
           -center=off

           -center-
       Lynx recognizes “1”, “+”, “on” and “true” for true values, and “0”, “-”, “off” and “false”
       for false values.  Other option-values are ignored.

       The default boolean, number and string option values  that  are  compiled  into  Lynx  are
       displayed  in the help-message provided by lynx -help.  Some of those may differ according
       to how Lynx was built; see the help message itself for these values.  The -help option  is
       processed  in  the  third pass of options-processing, so any option which sets a value, as
       well as runtime configuration values are reflected in the help-message.

       -      If the argument is only “-”, then Lynx expects to receive the  arguments  from  the
              standard  input.   This is to allow for the potentially very long command line that
              can be associated with the -get_data or -post_data arguments (see below).   It  can
              also  be  used  to  avoid having sensitive information in the invoking command line
              (which would be visible to other processes on most systems),  especially  when  the
              -auth or -pauth options are used.

       -accept_all_cookies
              accept all cookies.

       -anonymous
              apply restrictions for anonymous account, see also -restrictions.

       -assume_charset=MIMEname
              charset for documents that do not specify it.

       -assume_local_charset=MIMEname
              charset  assumed  for  local files, i.e., files which Lynx creates such as internal
              pages for the options menu.

       -assume_unrec_charset=MIMEname
              use this instead of unrecognized charsets.

       -auth=ID:PASSWD
              set authorization ID and password for protected documents at startup.  Be  sure  to
              protect any script files which use this switch.

       -base  prepend a request URL comment and BASE tag to text/html outputs for -source dumps.

       -bibhost=URL
              specify a local bibp server (default http://bibhost/).

       -blink forces  high intensity background colors for color mode, if available and supported
              by the terminal.  This applies to the slang library (for a few terminal emulators),
              or to OS/2 EMX with ncurses.

       -book  use  the  bookmark page as the startfile.  The default or command line startfile is
              still set for the Main screen command, and will be used if  the  bookmark  page  is
              unavailable or blank.

       -buried_news
              toggles  scanning of news articles for buried references, and converts them to news
              links.  Not recommended because email addresses enclosed in angle brackets will  be
              converted to false news links, and uuencoded messages can be trashed.

       -cache=NUMBER
              set the NUMBER of documents cached in memory.  The default is 10.

       -case  enable case-sensitive string searching.

       -center
              toggles  center  alignment in HTML TABLE.  Normally table cells are centered on the
              table grid.  Set this option “on” to disable centering.  The default is “off”.

       -cfg=FILENAME
              specifies a Lynx configuration file other than the default lynx.cfg.

       -child exit on left-arrow in startfile, and disable save to disk and associated print/mail
              options.

       -child_relaxed
              exit  on  left-arrow in startfile, but allow save to disk and associated print/mail
              options.

       -cmd_log=FILENAME
              write keystroke commands and related information to the specified file.

       -cmd_script=FILENAME
              read keystroke commands from the specified file.  You  can  use  the  data  written
              using  the  -cmd_log option.  Lynx will ignore other information which the command-
              logging may have written to the logfile.  Each line of the command script  contains
              either a comment beginning with “#”, or a keyword:

              exit
                 causes the script to stop, and forces Lynx to exit immediately.

              key
                 the character value, in printable form.  Cursor and other special keys are given
                 as names, e.g., “Down Arrow”.  Printable 7-bit ASCII codes are given as-is,  and
                 hexadecimal values represent other 8-bit codes.

              set
                 followed  by a “name=value” allows one to override values set in the lynx.cfg or
                 .lynxrc files.  Lynx tries the cfg-file setting first.

       -collapse_br_tags
              toggles collapsing of BR tags.

       -color forces color mode on, if available.  Default color control sequences which work for
              many  terminal  types  are  assumed if the terminal capability description does not
              specify how to handle color.  Lynx needs to be compiled with the slang library  for
              this  flag,  it  is  equivalent to setting the COLORTERM environment variable.  (If
              color support is instead provided by a color-capable curses library  like  ncurses,
              Lynx  relies completely on the terminal description to determine whether color mode
              is possible,  and  this  flag  is  not  needed  and  thus  unavailable.)   A  saved
              show_color=always  setting  found in a .lynxrc file at startup has the same effect.
              A saved show_color=never found in .lynxrc on startup is overridden by this flag.

       -connect_timeout=N
              Sets the connection timeout, where N is given in seconds.

       -cookie_file=FILENAME
              specifies a file to use to read cookies.  If none is specified, the  default  value
              is ~/.lynx_cookies for most systems, but ~/cookies for MS-DOS.

       -cookie_save_file=FILENAME
              specifies a file to use to store cookies.  If none is specified, the value given by
              -cookie_file is used.

       -cookies
              toggles handling of Set-Cookie headers.

       -core  toggles forced core dumps on fatal errors.  Turn this option off  to  ask  Lynx  to
              force a core dump if a fatal error occurs.

       -crawl with  -traversal,  output  each  page to a file.  with -dump, format output as with
              -traversal, but to the standard output.

       -curses_pads
              toggles the use of curses “pad” feature which supports left/right scrolling of  the
              display.   The  feature  is  normally  available  for  curses  configurations,  but
              inactive.  To activate it, use the “|” character or  the  LINEWRAP_TOGGLE  command.
              Toggling this option makes the feature altogether unavailable.

       -debug_partial
              separate incremental display stages with MessageSecs delay

       -default_colors
              toggles the default-colors feature which is normally set in the lynx.cfg file.

       -delay add DebugSecs delay after each progress-message

       -display=DISPLAY
              set the display variable for X rexec-ed programs.

       -display_charset=MIMEname
              set the charset for the terminal output.

       -dont_wrap_pre
              inhibit wrapping of text when -dump'ing and -crawl'ing, mark wrapped lines of <pre>
              in interactive session.

       -dump  dumps the formatted output of the  default  document  or  those  specified  on  the
              command  line  to  standard  output.   Unlike  interactive  mode, all documents are
              processed.  This can be used in the following way:

                  lynx -dump http://www.subir.com/lynx.html

              Files specified on the command line are formatted as HTML if their names  end  with
              one  of  the  standard web suffixes such as “.htm” or “.html”.  Use the -force_html
              option to format files whose names do not follow this convention.

       -editor=EDITOR
              enable external editing, using the specified EDITOR.  (vi, ed, emacs, etc.)

       -emacskeys
              enable emacs-like key movement.

       -enable_scrollback
              toggles  compatibility  with  communication  programs'  scrollback  keys  (may   be
              incompatible with some curses packages).

       -error_file=FILE
              define a file where Lynx will report HTTP access codes.

       -exec  enable local program execution (normally not configured).

       -fileversions
              include all versions of files in local VMS directory listings.

       -find_leaks
              toggle  memory  leak-checking.  Normally this is not compiled-into your executable,
              but when it is, it can be disabled for a session.

       -force_empty_hrefless_a
              force HREF-less “A” elements to be empty (close them as soon as they are seen).

       -force_html
              forces the first document to be interpreted as HTML.

              This is most useful when processing files specified on the command line which  have
              an  unrecognized  suffix (or the suffix is associated with a non-HTML type, such as
              “.txt” for plain text files).

              Lynx recognizes these file suffixes as HTML:

                  “.ht3”,
                  “.htm”,
                  “.html3”,
                  “.html”,
                  “.htmlx”,
                  “.php3”,
                  “.php”,
                  “.phtml”,
                  “.sht”, and
                  “.shtml”.

       -force_secure
              toggles forcing of the secure flag for SSL cookies.

       -forms_options
              toggles whether the Options Menu is key-based or form-based.

       -from  toggles transmissions of From headers.

       -ftp   disable ftp access.

       -get_data
              properly formatted data for a get form are read in  from  the  standard  input  and
              passed to the form.  Input is terminated by a line that starts with “---”.

              Lynx  issues an HTTP GET, sending the form to the path or URL given on the command-
              line and prints the response of the server.  If no path or URL is given, Lynx sends
              the form to the start-page.

       -head  send a HEAD request for the mime headers.

       -help  print the Lynx command syntax usage message, and exit.

       -hiddenlinks=[option]
              control the display of hidden links.

              merge
                 hidden  links  show up as bracketed numbers and are numbered together with other
                 links in the sequence of their occurrence in the document.

              listonly
                 hidden links are shown only on L)ist screens and listings generated by -dump  or
                 from  the P)rint menu, but appear separately at the end of those lists.  This is
                 the default behavior.

              ignore
                 hidden links do not appear even in listings.

       -historical
              toggles use of “>” or “-->” as a terminator for comments.

       -homepage=URL
              set homepage separate from start page.

       -image_links
              toggles inclusion of links for all images.

       -index=URL
              set the default index file to the specified URL.

       -ismap toggles inclusion of ISMAP links when client-side MAPs are present.

       -justify
              do justification of text.

       -link=NUMBER
              starting count for lnk#.dat files produced by -crawl.

       -list_decoded
              for -dump, show URL-encoded links decoded.

       -list_inline
              for -dump, show the links inline with the text.

       -listonly
              for -dump, show only the list of links.

       -localhost
              disable URLs that point to remote hosts.

       -locexec
              enable local program execution from local files only (if  Lynx  was  compiled  with
              local execution enabled).

       -lss=FILENAME
              specify  filename containing color-style information.  The default is lynx.lss.  If
              you give an empty filename, Lynx uses a built-in monochrome scheme  which  imitates
              the non-color-style configuration.

       -mime_header
              prints the MIME header of a fetched document along with its source.

       -minimal
              toggles minimal versus valid comment parsing.

       -nested_tables
              toggles nested-tables logic (for debugging).

       -newschunksize=NUMBER
              number of articles in chunked news listings.

       -newsmaxchunk=NUMBER
              maximum news articles in listings before chunking.

       -nobold
              disable bold video-attribute.

       -nobrowse
              disable directory browsing.

       -nocc  disable  Cc:  prompts for self copies of mailings.  Note that this does not disable
              any CCs which are incorporated within a mailto URL or form ACTION.

       -nocolor
              force color mode off,  overriding  terminal  capabilities  and  any  -color  flags,
              COLORTERM variable, and saved .lynxrc settings.

       -noexec
              disable local program execution.  (DEFAULT)

       -nofilereferer
              disable transmissions of Referer headers for file URLs.

       -nolist
              disable the link list feature in dumps.

       -nolog disable mailing of error messages to document owners.

       -nomargins
              disable left/right margins in the default style sheet.

       -nomore
              disable -more- string in statusline messages.

       -nonrestarting_sigwinch
              This  flag  is  not  available  on  all  systems,  Lynx  needs  to be compiled with
              HAVE_SIGACTION defined.  If available, this flag  may  cause  Lynx  to  react  more
              immediately to window changes when run within an xterm.

       -nonumbers
              disable   link-   and   field-numbering.    This   overrides   -number_fields   and
              -number_links.

       -nopause
              disable forced pauses for statusline messages.

       -noprint
              disable most print functions.

       -noredir
              prevents automatic redirection and prints a message with a link to the new URL.

       -noreferer
              disable transmissions of Referer headers.

       -noreverse
              disable reverse video-attribute.

       -nosocks
              disable SOCKS proxy usage by a SOCKSified Lynx.

       -nostatus
              disable the retrieval status messages.

       -notitle
              disable title and blank line from top of page.

       -nounderline
              disable underline video-attribute.

       -number_fields
              force numbering of links as well as form input fields

       -number_links
              force numbering of links.

       -partial
              toggles display partial pages while loading.

       -partial_thres=NUMBER
              number of lines to render before repainting display with partial-display logic

       -passive_ftp
              toggles passive ftp connections.

       -pauth=ID:PASSWD
              set authorization ID and password for a protected proxy server at startup.  Be sure
              to protect any script files which use this switch.

       -popup toggles  handling  of single-choice SELECT options via popup windows or as lists of
              radio buttons.

       -post_data
              properly formatted data for a post form are read in from  the  standard  input  and
              passed to the form.  Input is terminated by a line that starts with “---”.

              Lynx issues an HTTP POST, sending the form to the path or URL given on the command-
              line and prints the response of the server.  If no path or URL is given, Lynx sends
              the form to the start-page.

       -preparsed
              show  HTML  source  preparsed  and  reformatted when used with -source or in source
              view.

       -prettysrc
              show HTML source view with lexical elements and tags in color.

       -print enable print functions.  (default)

       -pseudo_inlines
              toggles pseudo-ALTs for inline images with no ALT string.

       -raw   toggles default setting of 8-bit character translations or CJK mode for the startup
              character set.

       -realm restricts access to URLs in the starting realm.

       -read_timeout=N
              Sets the read-timeout, where N is given in seconds.

       -reload
              flushes  the cache on a proxy server (only the first document given on the command-
              line is affected).

       -restrictions=[option][,option][,option]...
              allows a list of services to be disabled selectively.  Dashes  and  underscores  in
              option  names  can  be intermixed.  The following list is printed if no options are
              specified.

              all
                 restricts all options listed below.

              bookmark
                 disallow changing the location of the bookmark file.

              bookmark_exec
                 disallow execution links via the bookmark file.

              change_exec_perms
                 disallow changing the eXecute permission  on  files  (but  still  allow  it  for
                 directories) when local file management is enabled.

              default
                 same as command line option -anonymous.  Disables default services for anonymous
                 users.  Set  to  all  restricted,  except  for:  inside_telnet,  outside_telnet,
                 inside_ftp,    outside_ftp,    inside_rlogin,    outside_rlogin,    inside_news,
                 outside_news, telnet_port, jump, mail, print, exec, and goto.  The settings  for
                 these, as well as additional goto restrictions for specific URL schemes that are
                 also applied, are derived from definitions within userdefs.h.

              dired_support
                 disallow local file management.

              disk_save
                 disallow saving to disk in the download and print menus.

              dotfiles
                 disallow access to, or creation of, hidden (dot) files.

              download
                 disallow some downloaders  in  the  download  menu  (does  not  imply  disk_save
                 restriction).

              editor
                 disallow external editing.

              exec
                 disable execution scripts.

              exec_frozen
                 disallow the user from changing the local execution option.

              externals
                 disallow  some  “EXTERNAL”  configuration  lines  if support for passing URLs to
                 external applications (with the EXTERN command) is compiled in.

              file_url
                 disallow using G)oto, served links or bookmarks for file: URLs.

              goto
                 disable the “g” (goto) command.

              inside_ftp
                 disallow ftps for people coming from  inside  your  domain  (utmp  required  for
                 selectivity).

              inside_news
                 disallow  USENET  news  posting  for people coming from inside your domain (utmp
                 required for selectivity).

              inside_rlogin
                 disallow rlogins for people coming from inside your domain  (utmp  required  for
                 selectivity).

              inside_telnet
                 disallow  telnets  for  people coming from inside your domain (utmp required for
                 selectivity).

              jump
                 disable the “j” (jump) command.

              multibook
                 disallow multiple bookmarks.

              mail
                 disallow mail.

              news_post
                 disallow USENET News posting.

              options_save
                 disallow saving options in .lynxrc.

              outside_ftp
                 disallow ftps for people coming from outside  your  domain  (utmp  required  for
                 selectivity).

              outside_news
                 disallow  USENET  news  reading  and posting for people coming from outside your
                 domain (utmp required for selectivity).  This  restriction  applies  to  “news”,
                 “nntp”,  “newspost”,  and  “newsreply” URLs, but not to “snews”, “snewspost”, or
                 “snewsreply” in case they are supported.

              outside_rlogin
                 disallow rlogins for people coming from outside your domain (utmp  required  for
                 selectivity).

              outside_telnet
                 disallow  telnets  for people coming from outside your domain (utmp required for
                 selectivity).

              print
                 disallow most print options.

              shell
                 disallow shell escapes and lynxexec or lynxprog G)oto's.

              suspend
                 disallow Unix Control-Z suspends with escape to shell.

              telnet_port
                 disallow specifying a port in telnet G)oto's.

              useragent
                 disallow modifications of the User-Agent header.

       -resubmit_posts
              toggles forced  resubmissions  (no-cache)  of  forms  with  method  POST  when  the
              documents  they  returned  are sought with the PREV_DOC command or from the History
              List.

       -rlogin
              disable recognition of rlogin commands.

       -scrollbar
              toggles showing scrollbar.

       -scrollbar_arrow
              toggles showing arrows at ends of the scrollbar.

       -selective
              require .www_browsable files to browse directories.

       -session=FILENAME
              resumes from specified file on startup and saves session to that file on exit.

       -sessionin=FILENAME
              resumes session from specified file.

       -sessionout=FILENAME
              saves session to specified file.

       -short_url
              show very long URLs in the status line with “...” to represent  the  portion  which
              cannot  be  displayed.  The beginning and end of the URL are displayed, rather than
              suppressing the end.

       -show_cfg
              Print the configuration settings, e.g., as read from “lynx.cfg”, and exit.

       -show_cursor
              If enabled the cursor will not be hidden in the right hand corner but will  instead
              be  positioned  at  the  start  of the currently selected link.  Show cursor is the
              default for systems without FANCY_CURSES capabilities.  The  default  configuration
              can  be  changed  in  userdefs.h  or lynx.cfg.  The command line switch toggles the
              default.

       -show_rate
              If enabled the transfer rate is shown in bytes/second.  If  disabled,  no  transfer
              rate is shown.  Use lynx.cfg or the options menu to select KB/second and/or ETA.

       -socks5_proxy=URL
              (Via  which)  SOCKS5  proxy  to  connect:  any  network  traffic, including all DNS
              resolutions but the one for URL itself,  will  be  redirected  through  the  SOCKS5
              proxy.    URL   may  be  given  as  “proxy.example.com”,  “proxy.example.com:1080”,
              “192.168.0.1”, or “192.168.0.1:1080” (and IPv6 notation if so supported).  A SOCKS5
              proxy may also be specified via the environment variable SOCKS5_PROXY.  This option
              controls the builtin SOCKS5 support, which is unrelated to the option -nosocks.

       -soft_dquotes
              toggles emulation of the old Netscape and Mosaic bug which treated  “>”  as  a  co-
              terminator for double-quotes and tags.

       -source
              works  the  same  as  dump  but outputs HTML source instead of formatted text.  For
              example

                  lynx -source . >foo.html

              generates HTML source listing the files in the current  directory.   Each  file  is
              marked  by  an HREF relative to the parent directory.  Add a trailing slash to make
              the HREF's relative to the current directory:

                  lynx -source ./ >foo.html

       -stack_dump
              disable SIGINT cleanup handler

       -startfile_ok
              allow non-http startfile and homepage with -validate.

       -stderr
              When dumping a document using -dump or -source,  Lynx  normally  does  not  display
              alert  (error)  messages  that  you  see on the screen in the status line.  Use the
              -stderr option to tell Lynx to write these messages to the standard error.

       -stdin read the startfile from standard input (UNIX only).

       -syslog=text
              information for syslog call.

       -syslog_urls
              log requested URLs with syslog.

       -tagsoup
              initialize parser, using Tag Soup DTD rather than SortaSGML.

       -telnet
              disable recognition of telnet commands.

       -term=TERM
              tell Lynx what terminal type to assume it is talking to.  (This may be  useful  for
              remote  execution,  when,  for  example, Lynx connects to a remote TCP/IP port that
              starts a script that, in turn, starts another Lynx process.)

       -timeout=N
              For win32, sets the network read-timeout, where N is given in seconds.

       -tlog  toggles between using a Lynx Trace  Log  and  stderr  for  trace  output  from  the
              session.

       -tna   turns on “Textfields Need Activation” mode.

       -trace turns on Lynx trace mode.  Destination of trace output depends on -tlog.

       -trace_mask=value
              turn  on optional traces, which may result in very large trace files.  Logically OR
              the values to combine options:

              1  SGML character parsing states

              2  color-style

              4  TRST (table layout)

              8  configuration  (lynx.cfg,  .lynxrc,  .lynx-keymaps,   mime.types   and   mailcap
                 contents)

              16 binary string copy/append, used in form data construction.

              32 cookies

              64 character sets

              128
                 GridText parsing

              256
                 timing

              512
                 detailed URL parsing

       -traversal
              traverse  all  http links derived from startfile.  When used with -crawl, each link
              that begins with the same string as startfile is output to  a  file,  intended  for
              indexing.

              See CRAWL.announce for more information.

       -trim_blank_lines
              toggles  trimming  of trailing blank lines as well as the related trimming of blank
              lines while collapsing BR tags.

       -trim_input_fields
              trim input text/textarea fields in forms.

       -underline_links
              toggles use of underline/bold attribute for links.

       -underscore
              toggles use of _underline_ format in dumps.

       -unique_urls
              check for duplicate link numbers in each page and corresponding  lists,  and  reuse
              the original link number.

       -update_term_title
              enables  updating  the  title  in  terminal  emulators.   Use only if your terminal
              emulator supports that escape code.  Has no effect when used with -notitle.

       -use_mouse
              turn on mouse support, if available.  Clicking the left  mouse  button  on  a  link
              traverses it.  Clicking the right mouse button pops back.  Click on the top line to
              scroll up.  Click on the bottom line to scroll down.  The first  few  positions  in
              the  top  and  bottom  line may invoke additional functions.  Lynx must be compiled
              with ncurses or slang to support this feature.  If ncurses is  used,  clicking  the
              middle  mouse  button  pops  up a simple menu.  Mouse clicks may only work reliably
              while Lynx is idle waiting for input.

       -useragent=Name
              set alternate Lynx User-Agent header.

       -validate
              accept only http URLs (for validation).  Complete security  restrictions  also  are
              implemented.

       -verbose
              toggle [LINK], [IMAGE] and [INLINE] comments with filenames of these images.

       -version
              print version information, and exit.

       -vikeys
              enable vi-like key movement.

       -wdebug
              enable  Waterloo  tcp/ip packet debug (print to watt debugfile).  This applies only
              to DOS versions compiled with WATTCP or WATT-32.

       -width=NUMBER
              number of columns for formatting of dumps, default is 80.  This is limited  by  the
              number of columns that Lynx could display, typically 1024 (the MAX_LINE symbol).

       -with_backspaces
              emit backspaces in output if -dump'ing or -crawl'ing (like man does)

       -xhtml_parsing
              tells  Lynx  that  it can ignore certain tags which have no content in an XHTML 1.0
              document.  For example “<p/>” will be discarded.
```

#### **COMMANDS**

```
       More than one key can be mapped to a given command.  Here are some of the most useful:

       •   Use Up arrow and Down arrow to scroll through hypertext links.

       •   Right arrow or Return will follow a highlighted hypertext link.

       •   Left Arrow or “u” will retreat from a link.

       •   Type “H”, “?”, or F1 for online help and descriptions of key-stroke commands.

       •   Type “k” or “K” for a list of the current key-stroke command mappings.

           If the same command is mapped to the same letter  differing  only  by  upper/lowercase
           only the lowercase mapping is shown.

       •   Type Delete to view history list.
```

#### **ENVIRONMENT**

```
       In  addition  to  various  “standard”  environment  variables such as DISPLAY, HOME, PATH,
       SHELL, TMPDIR, USER, etc., Lynx utilizes several Lynx-specific environment  variables,  if
       they exist.

       Others  may  be  created  or  modified by Lynx to pass data to an external program, or for
       other reasons.  These are listed separately below.

       See also the sections on SIMULATED CGI SUPPORT and NATIVE LANGUAGE SUPPORT, below.

       Note:  Not all environment variables apply to all types of platforms  supported  by  Lynx,
       though most do.  Feedback on platform dependencies is solicited.

       Environment Variables Used By Lynx:

       COLORTERM           If  set,  color  capability  for  the terminal is forced on at startup
                           time.  The actual value assigned to the  variable  is  ignored.   This
                           variable  is only meaningful if Lynx was built using the slang screen-
                           handling library.

       LYNX_CFG            This variable, if set, will override the default location and name  of
                           the global configuration file (normally, lynx.cfg) that was defined by
                           the  LYNX_CFG_FILE   constant   in   the   userdefs.h   file,   during
                           installation.

                           See the userdefs.h file for more information.

       LYNX_CFG_PATH       If  set,  this  variable  overrides  the  compiled-in  search-list  of
                           directories used to find the configuration files, e.g.,  lynx.cfg  and
                           lynx.lss.   The  list  is delimited with ":" (or ";" for Windows) like
                           the PATH environment variable.

       LYNX_HELPFILE       If set, this variable overrides the compiled-in URL and  configuration
                           file URL for the Lynx help file.

       LYNX_LOCALEDIR      If set, this variable overrides the compiled-in location of the locale
                           directory which contains native language (NLS) message text.

       LYNX_LSS            This variable, if set, specifies the  location  of  the  default  Lynx
                           character  style  sheet  file.  [Currently only meaningful if Lynx was
                           built using curses color style support.]

       LYNX_SAVE_SPACE     This variable, if set, will override the default path prefix for files
                           saved to disk that is defined in the lynx.cfg SAVE_SPACE: statement.

                           See the lynx.cfg file for more information.

       LYNX_TEMP_SPACE     This  variable,  if  set,  will  override  the default path prefix for
                           temporary files that was defined during installation, as well  as  any
                           value that may be assigned to the TMPDIR variable.

       MAIL                This  variable  specifies  the  default  inbox Lynx will check for new
                           mail, if such checking is enabled in the lynx.cfg file.

       NEWS_ORGANIZATION   This variable, if set, provides the string used in  the  Organization:
                           header  of  USENET news postings.  It will override the setting of the
                           ORGANIZATION environment variable, if it is also set  (and,  on  UNIX,
                           the contents of an /etc/organization file, if present).

       NNTPSERVER          If  set,  this variable specifies the default NNTP server that will be
                           used for USENET news reading and posting with Lynx, via news: URL's.

       ORGANIZATION        This variable, if set, provides the string used in  the  Organization:
                           header  of  USENET  news  postings.   On  UNIX,  it  will override the
                           contents of an /etc/organization file, if present.

       PROTOCOL_proxy      Lynx supports the use of  proxy  servers  that  can  act  as  firewall
                           gateways  and  caching  servers.   They  are  preferable  to the older
                           gateway servers (see WWW_access_GATEWAY, below).

                           Each protocol used by Lynx, (http, ftp, gopher, etc),  can  be  mapped
                           separately    by   setting   environment   variables   of   the   form
                           PROTOCOL_proxy.  Protocols are indicated in a URI by the  name  before
                           “:”, e.g., “http” in “http://some.server.dom:port/” for HTML.

                           Depending  on  your  system configuration and supported protocols, the
                           environment variables recognized by lynx may include

                               cso_proxy
                               finger_proxy
                               ftp_proxy
                               gopher_proxy
                               http_proxy
                               https_proxy
                               news_proxy
                               newspost_proxy
                               newsreply_proxy
                               nntp_proxy
                               no_proxy
                               rlogin_proxy
                               snews_proxy
                               snewspost_proxy
                               snewsreply_proxy
                               telnet_proxy
                               tn3270_proxy
                               wais_proxy

                           See Lynx Users Guide for additional details and examples.

       RL_CLCOPY_CMD       Pipe the contents of the  current  link  using  this  command  as  the
                           target.

       RL_PASTE_CMD        Open  a  pipe  to  read from this command, pasting it into the current
                           editable-field or command-prompt.

       SOCKS5_PROXY        Is inspected  if  -socks5_proxy  has  not  been  used  (for  the  same
                           content).

       SSL_CERT_DIR        Set to the directory containing trusted certificates.

       SSL_CERT_FILE       Set   to  the  full  path  and  filename  for  your  file  of  trusted
                           certificates.

       WWW_access_GATEWAY  Lynx still supports use of gateway servers, with the servers specified
                           via  “WWW_access_GATEWAY”  variables (where “access” is lower case and
                           can be “http”, “ftp”,  “gopher”  or  “wais”).   However  most  gateway
                           servers  have  been  discontinued.   Note  that  you  do not include a
                           terminal  “/”  for  gateways,  but  do  for   proxies   specified   by
                           PROTOCOL_proxy environment variables.

                           See Lynx Users Guide for details.

       WWW_HOME            This variable, if set, will override the default startup URL specified
                           in any of the Lynx configuration files.

       Environment Variables Set or Modified By Lynx:

       LYNX_PRINT_DATE     This variable is set by the Lynx p(rint) function, to the Date: string
                           seen  in  the document's “Information about” page (= cmd), if any.  It
                           is created for use by an external program, as defined  in  a  lynx.cfg
                           PRINTER:  definition  statement.   If the field does not exist for the
                           document, the variable is set to a null  string  under  UNIX,  or  “No
                           Date” under VMS.

       LYNX_PRINT_LASTMOD  This  variable  is  set by the Lynx p(rint) function, to the Last Mod:
                           string seen in the document's “Information about”  page  (=  cmd),  if
                           any.   It  is  created for use by an external program, as defined in a
                           lynx.cfg PRINTER: definition statement.  If the field does  not  exist
                           for  the document, the variable is set to a null string under UNIX, or
                           “No LastMod” under VMS.

       LYNX_PRINT_TITLE    This variable is set by the Lynx p(rint) function,  to  the  Linkname:
                           string  seen  in  the  document's “Information about” page (= cmd), if
                           any.  It is created for use by an external program, as  defined  in  a
                           lynx.cfg  PRINTER:  definition statement.  If the field does not exist
                           for the document, the variable is set to a null string under UNIX,  or
                           “No Title” under VMS.

       LYNX_PRINT_URL      This  variable is set by the Lynx p(rint) function, to the URL: string
                           seen in the document's “Information about” page (= cmd), if  any.   It
                           is  created  for  use by an external program, as defined in a lynx.cfg
                           PRINTER: definition statement.  If the field does not  exist  for  the
                           document, the variable is set to a null string under UNIX, or “No URL”
                           under VMS.

       LYNX_TRACE          If set, causes Lynx to write a trace file as if the -trace option were
                           supplied.

       LYNX_TRACE_FILE     If  set,  overrides  the  compiled-in name of the trace file, which is
                           either Lynx.trace or  LY-TRACE.LOG  (the  latter  on  the  DOS/Windows
                           platforms).   The  trace  file  is in either case relative to the home
                           directory.

       LYNX_VERSION        This variable is always set by Lynx, and may be used  by  an  external
                           program to determine if it was invoked by Lynx.

                           See  also  the comments in the distribution's sample mailcap file, for
                           notes on usage in such a file.

       TERM                Normally, this variable is used by Lynx to determine the terminal type
                           being  used  to invoke Lynx.  If, however, it is unset at startup time
                           (or has the value “unknown”), or if the -term command-line  option  is
                           used (see OPTIONS section above), Lynx will set or modify its value to
                           the user specified terminal type (for the Lynx execution environment).
                           Note:  If set/modified by Lynx, the values of the LINES and/or COLUMNS
                           environment variables may also be changed.

   Simulated CGI Support
       If built with the cgi-links option enabled, Lynx allows access to a  cgi  script  directly
       without the need for an http daemon.

       When executing such “lynxcgi scripts” (if enabled), the following variables may be set for
       simulating a CGI environment:

       CONTENT_LENGTH

       CONTENT_TYPE

       DOCUMENT_ROOT

       HTTP_ACCEPT_CHARSET

       HTTP_ACCEPT_LANGUAGE

       HTTP_USER_AGENT

       PATH_INFO

       PATH_TRANSLATED

       QUERY_STRING

       REMOTE_ADDR

       REMOTE_HOST

       REQUEST_METHOD

       SERVER_SOFTWARE

       Other environment variables are not inherited by the script, unless they are provided  via
       a LYNXCGI_ENVIRONMENT statement in the configuration file.  See the lynx.cfg file, and the
       (draft) CGI  1.1  Specification  <http://Web.Golux.Com/coar/cgi/draft-coar-cgi-v11-00.txt>
       for the definition and usage of these variables.

       The CGI Specification, and other associated documentation, should be consulted for general
       information on CGI script programming.

   Native Language Support
       If configured and installed with Native Language Support, Lynx  will  display  status  and
       other messages in your local language.  See the file ABOUT_NLS in the source distribution,
       or at your local GNU site, for more information about internationalization.

       The following environment variables may be used to alter default settings:

       LANG                This variable, if set, will override the default message language.  It
                           is  an  ISO  639  two-letter  code identifying the language.  Language
                           codes are NOT the same as the country codes given in ISO 3166.

       LANGUAGE            This variable, if set, will override  the  default  message  language.
                           This  is  a  GNU  extension  that  has higher priority for setting the
                           message catalog than LANG or LC_ALL.

       LC_ALL              and

       LC_MESSAGES         These variables,  if  set,  specify  the  notion  of  native  language
                           formatting style.  They are POSIXly correct.

       LINGUAS             This  variable,  if  set  prior to configuration, limits the installed
                           languages to specific values.  It is a space-separated  list  of  two-
                           letter codes.  Currently, it is hard-coded to a wish list.

       NLSPATH             This  variable,  if  set,  is  used  as  the  path  prefix for message
                           catalogs.
```

#### **NOTES**

```
   Mailing Lists
       If you wish to contribute to the further development of Lynx,  subscribe  to  our  mailing
       list.   Send  email to <lynx-dev-request@nongnu.org> with “subscribe lynx-dev” as the only
       line in the body of your message.

       Send bug reports, comments, suggestions to <lynx-dev@nongnu.org> after subscribing.

       Unsubscribe by sending email to <lynx-dev-request@nongnu.org> with “unsubscribe  lynx-dev”
       as  the only line in the body of your message.  Do not send the unsubscribe message to the
       lynx-dev list, itself.

   Acknowledgments
       Lynx has incorporated code from a variety of sources along the way.  The earliest versions
       of  Lynx  included  code  from  Earl  Fogel  of  Computing  Services  at the University of
       Saskatchewan, who implemented HYPERREZ in the Unix environment.  HYPERREZ was developed by
       Niel  Larson  of  Think.com and served as the model for the early versions of Lynx.  Those
       versions also incorporated libraries  from  the  Unix  Gopher  clients  developed  at  the
       University  of  Minnesota,  and  the later versions of Lynx rely on the WWW client library
       code developed by Tim Berners-Lee and the WWW community.  Also a special thanks to  Foteos
       Macrides who ported much of Lynx to VMS and did or organized most of its development since
       the departures of Lou Montulli and Garrett Blythe from the University  of  Kansas  in  the
       summer  of  1994  through  the  release  of  v2.7.2,  and  to  everyone on the net who has
       contributed to Lynx's development  either  directly  (through  patches,  comments  or  bug
       reports) or indirectly (through inspiration and development of other systems).
```

#### **AUTHORS**

```
       Lou Montulli, Garrett Blythe, Craig Lavender, Michael Grobe, Charles Rezac
       Academic Computing Services
       University of Kansas
       Lawrence, Kansas 66047

       Foteos Macrides
       Worcester Foundation for Biomedical Research
       Shrewsbury, Massachusetts 01545

       Thomas E. Dickey
       <dickey@invisible-island.net>
```

#### **SEE** **ALSO**

```
       catgets(3),   curses(3),  environ(7),  ftp(1),  gettext(GNU),  localeconv(3),  ncurses(3),
       setlocale(3), termcap(5), terminfo(5)
```