+++
title = "telnet"
date = 2024-10-11T19:22:57+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

https://manpages.ubuntu.com/manpages/noble/man1/telnet-ssl.1.html

#### **NAME**

```
     telnet — user interface to the TELNET protocol
```

#### **SYNOPSIS**

```
     telnet [-468EKLadr] [-S tos] [-X authtype] [-b address] [-e escapechar] [-l user]
            [-n tracefile] [-z option] [host [port]]
```

#### **DESCRIPTION**

```
     The telnet command is used for interactive communication with another host using the TELNET
     protocol. It begins in command mode, where it prints a telnet prompt ("telnet> "). If telnet
     is invoked with a host argument, it performs an open command implicitly; see the description
     below.

     Options:

     -4      Force IPv4 address resolution.

     -6      Force IPv6 address resolution.

     -8      Request 8-bit operation. This causes an attempt to negotiate the TELNET BINARY
             option for both input and output. By default telnet is not 8-bit clean.

     -E      Disables the escape character functionality; that is, sets the escape character to
             ``no character''.

     -K      Specifies no automatic login to the remote system.

     -L      Specifies an 8-bit data path on output.  This causes the TELNET BINARY option to be
             negotiated on just output.

     -X atype
             Disables the atype type of authentication.

     -a      Attempt automatic login.  Currently, this sends the user name via the USER variable
             of the NEW-ENVIRON option if supported by the remote system. The username is
             retrieved via getlogin(3).

     -b address
             Use bind(2) on the local socket to bind it to a specific local address.

     -d      Sets the initial value of the debug toggle to TRUE.

     -r      Emulate rlogin(1).  In this mode, the default escape character is a tilde. Also, the
             interpretation of the escape character is changed: an escape character followed by a
             dot causes telnet to disconnect from the remote host. A ^Z instead of a dot suspends
             telnet, and a ^] (the default telnet escape character) generates a normal telnet
             prompt. These codes are accepted only at the beginning of a line.

     -S tos  Sets the IP type-of-service (TOS) option for the telnet connection to the value tos.

     -e escapechar
             Sets the escape character to escapechar. If no character is supplied, no escape
             character will be used.  Entering the escape character while connected causes telnet
             to drop to command mode.

     -l user
             Specify user as the user to log in as on the remote system. This is accomplished by
             sending the specified name as the USER environment variable, so it requires that the
             remote system support the TELNET NEW-ENVIRON option. This option implies the -a
             option, and may also be used with the open command.

     -n tracefile
             Opens tracefile for recording trace information.  See the set tracefile command
             below.

     -z option
             Set SSL (Secure Socket Layer) parameters. The default is to negotiate via telnet
             protocol if SSL is available at server side and then to switch it on. In this mode
             you can connect to both conventional and SSL enhanced telnetd's. If the connection
             is made to localhost and -z secure is not set, then SSL is not enabled.

             The SSL parameters are:

             debug       Send SSL related debugging information to stderr.

             authdebug   Enable authentication debugging.

             ssl         Negotiate SSL at first, then use TELNET protocol. In this mode you can
                         connect to any server directly supporting SSL, like Apache-SSL.  The
                         TELNET protocol negotiation is done encrypted.  A typical example is the
                         call telnet -z ssl mail.google.com https.

             nossl, !ssl
                         switch off SSL negotiation

             certrequired
                         server certificate is mandatory

             secure      Don't switch back to unencrypted mode (no SSL) if SSL is not available.

             verbose     Be verbose about certificates etc.

             verify=int  Set the SSL verify flags.  (See SSL_VERIFY_* in openssl/ssl.h ).

             cacert=CA_file
                         This is used for verification of whatever certificate the remote server
                         cares to send as identifier.

             cert=cert_file
                         Present the certificate(s) in cert_file to the server.  They are in PEM-
                         format, and the first identifies you as a client.

             key=key_file
                         Use the key(s) in key_file in case a key is not stored together with the
                         certificate.

             cipher=ciph_list
                         Set the preferred ciphers to ciph_list.  The environment variable
                         SSL_CIPHER serves the same purpose.  (See openssl/ssl.h ).

     host    Specifies a host to contact over the network.

     port    Specifies a port number or service name to contact. If not specified, the telnet
             port (23) is used.

     Protocol:

     Once a connection has been opened, telnet will attempt to enable the TELNET LINEMODE option.
     If this fails, then telnet will revert to one of two input modes: either “character at a
     time” or “old line by line” depending on what the remote system supports.

     When LINEMODE is enabled, character processing is done on the local system, under the
     control of the remote system.  When input editing or character echoing is to be disabled,
     the remote system will relay that information.  The remote system will also relay changes to
     any special characters that happen on the remote system, so that they can take effect on the
     local system.

     In “character at a time” mode, most text typed is immediately sent to the remote host for
     processing.

     In “old line by line” mode, all text is echoed locally, and (normally) only completed lines
     are sent to the remote host.  The “local echo character” (initially “^E”) may be used to
     turn off and on the local echo (this would mostly be used to enter passwords without the
     password being echoed).

     If the LINEMODE option is enabled, or if the localchars toggle is TRUE (the default for “old
     line by line“; see below), the user's quit, intr, and flush characters are trapped locally,
     and sent as TELNET protocol sequences to the remote side.  If LINEMODE has ever been
     enabled, then the user's susp and eof are also sent as TELNET protocol sequences, and quit
     is sent as a TELNET ABORT instead of BREAK There are options (see toggle autoflush and
     toggle autosynch below) which cause this action to flush subsequent output to the terminal
     (until the remote host acknowledges the TELNET sequence) and flush previous terminal input
     (in the case of quit and intr).

     Commands:

     The following telnet commands are available. Unique prefixes are understood as
     abbreviations.

     auth argument ...
                The auth command controls the TELNET AUTHENTICATE protocol option.  If telnet was
                compiled without authentication, the auth command will not be supported.  Valid
                arguments are as follows:

                disable type  Disable the specified type of authentication.  To obtain a list of
                              available types, use the auth disable ? command.

                enable type   Enable the specified type of authentication.  To obtain a list of
                              available types, use the auth enable ? command.

                status        List the current status of the various types of authentication.

     close      Close the connection to the remote host, if any, and return to command mode.

     display argument ...
                Display all, or some, of the set and toggle values (see below).

     environ arguments...
                The environ command is used to propagate environment variables across the telnet
                link using the TELNET NEW-ENVIRON protocol option.  All variables exported from
                the shell are defined, but only the DISPLAY and PRINTER variables are marked to
                be sent by default.  The USER variable is marked to be sent if the -a or -l
                command-line options were used.

                Valid arguments for the environ command are:

                define variable value
                            Define the variable variable to have a value of value. Any variables
                            defined by this command are automatically marked for propagation
                            (``exported'').  The value may be enclosed in single or double quotes
                            so that tabs and spaces may be included.

                undefine variable
                            Remove any existing definition of variable.

                export variable
                            Mark the specified variable for propagation to the remote host.

                unexport variable
                            Do not mark the specified variable for propagation to the remote
                            host. The remote host may still ask explicitly for variables that are
                            not exported.

                list        List the current set of environment variables.  Those marked with a *
                            will be propagated to the remote host. The remote host may still ask
                            explicitly for the rest.

                ?           Prints out help information for the environ command.

     logout     Send the TELNET LOGOUT protocol option to the remote host.  This command is
                similar to a close command. If the remote host does not support the LOGOUT
                option, nothing happens.  But if it does, this command should cause it to close
                the connection.  If the remote side also supports the concept of suspending a
                user's session for later reattachment, the logout command indicates that the
                session should be terminated immediately.

     mode type  Type is one of several options, depending on the state of the session.  Telnet
                asks the remote host to go into the requested mode. If the remote host says it
                can, that mode takes effect.

                character     Disable the TELNET LINEMODE option, or, if the remote side does not
                              understand the LINEMODE option, then enter “character at a time“
                              mode.

                line          Enable the TELNET LINEMODE option, or, if the remote side does not
                              understand the LINEMODE option, then attempt to enter “old-line-by-
                              line“ mode.

                isig (-isig)  Attempt to enable (disable) the TRAPSIG mode of the LINEMODE
                              option.  This requires that the LINEMODE option be enabled.

                edit (-edit)  Attempt to enable (disable) the EDIT mode of the LINEMODE option.
                              This requires that the LINEMODE option be enabled.

                softtabs (-softtabs)
                              Attempt to enable (disable) the SOFT_TAB mode of the LINEMODE
                              option.  This requires that the LINEMODE option be enabled.

                litecho (-litecho)
                              Attempt to enable (disable) the LIT_ECHO mode of the LINEMODE
                              option.  This requires that the LINEMODE option be enabled.

                ?             Prints out help information for the mode command.

     open host [[-l] user][- port]
                Open a connection to the named host.  If no port number is specified, telnet will
                attempt to contact a telnet daemon at the standard port (23).  The host
                specification may be a host name or IP address.  The -l option may be used to
                specify a user name to be passed to the remote system, like the -l command-line
                option.

                When connecting to ports other than the telnet port, telnet does not attempt
                telnet protocol negotiations. This makes it possible to connect to services that
                do not support the telnet protocol without making a mess. Protocol negotiation
                can be forced by placing a dash before the port number.

                After establishing a connection, any commands associated with the remote host in
                /etc/telnetrc and the user's .telnetrc file are executed, in that order.

                The format of the telnetrc files is as follows: Lines beginning with a #, and
                blank lines, are ignored.  The rest of the file should consist of hostnames and
                sequences of telnet commands to use with that host. Commands should be one per
                line, indented by whitespace; lines beginning without whitespace are interpreted
                as hostnames.  Lines beginning with the special hostname ‘DEFAULT’ will apply to
                all hosts.  Hostnames including ‘DEFAULT’ may be followed immediately by a colon
                and a port number or string.  If a port is specified it must match exactly with
                what is specified on the command line.  If no port was specified on the command
                line, then the value ‘telnet’ is used.  Upon connecting to a particular host, the
                commands associated with that host are executed.

     quit       Close any open session and exit telnet.  An end of file condition on input, when
                in command mode, will trigger this operation as well.

     send arguments
                Send one or more special telnet protocol character sequences to the remote host.
                The following are the codes which may be specified (more than one may be used in
                one command):

                abort   Sends the TELNET ABORT (Abort Processes) sequence.

                ao      Sends the TELNET AO (Abort Output) sequence, which should cause the
                        remote system to flush all output from the remote system to the user's
                        terminal.

                ayt     Sends the TELNET AYT (Are You There?) sequence, to which the remote
                        system may or may not choose to respond.

                brk     Sends the TELNET BRK (Break) sequence, which may have significance to the
                        remote system.

                ec      Sends the TELNET EC (Erase Character) sequence, which should cause the
                        remote system to erase the last character entered.

                el      Sends the TELNET EL (Erase Line) sequence, which should cause the remote
                        system to erase the line currently being entered.

                eof     Sends the TELNET EOF (End Of File) sequence.

                eor     Sends the TELNET EOR (End of Record) sequence.

                escape  Sends the current telnet escape character.

                ga      Sends the TELNET GA (Go Ahead) sequence, which likely has no significance
                        to the remote system.

                getstatus
                        If the remote side supports the TELNET STATUS command, getstatus will
                        send the subnegotiation to request that the server send its current
                        option status.

                ip      Sends the TELNET IP (Interrupt Process) sequence, which should cause the
                        remote system to abort the currently running process.

                nop     Sends the TELNET NOP (No Operation) sequence.

                susp    Sends the TELNET SUSP (Suspend Process) sequence.

                synch   Sends the TELNET SYNCH sequence.  This sequence causes the remote system
                        to discard all previously typed (but not yet read) input.  This sequence
                        is sent as TCP urgent data (and may not work if the remote system is a
                        4.2BSD system -- if it doesn't work, a lower case “r” may be echoed on
                        the terminal).

                do cmd

                dont cmd

                will cmd

                wont cmd
                        Sends the TELNET DO cmd sequence.  cmd can be either a decimal number
                        between 0 and 255, or a symbolic name for a specific TELNET command.  cmd
                        can also be either help or ? to print out help information, including a
                        list of known symbolic names.

                ?       Prints out help information for the send command.

     set argument value

     unset argument value
                The set command will set any one of a number of telnet variables to a specific
                value or to TRUE.  The special value off turns off the function associated with
                the variable. This is equivalent to using the unset command.  The unset command
                will disable or set to FALSE any of the specified variables.  The values of
                variables may be interrogated with the display command.  The variables which may
                be set or unset, but not toggled, are listed here.  In addition, any of the
                variables for the toggle command may be explicitly set or unset.

                ayt     If telnet is in localchars mode, or LINEMODE is enabled, and the status
                        character is typed, a TELNET AYT sequence is sent to the remote host.
                        The initial value for the "Are You There" character is the terminal's
                        status character.

                echo    This is the value (initially “^E”) which, when in “line by line” mode,
                        toggles between doing local echoing of entered characters (for normal
                        processing), and suppressing echoing of entered characters (for entering,
                        say, a password).

                eof     If telnet is operating in LINEMODE or “old line by line” mode, entering
                        this character as the first character on a line will cause this character
                        to be sent to the remote system.  The initial value of the eof character
                        is taken to be the terminal's eof character.

                erase   If telnet is in localchars mode (see toggle localchars below), and if
                        telnet is operating in “character at a time” mode, then when this
                        character is typed, a TELNET EC sequence (see send ec above) is sent to
                        the remote system.  The initial value for the erase character is taken to
                        be the terminal's erase character.

                escape  This is the telnet escape character (initially “^]”) which causes entry
                        into telnet command mode (when connected to a remote system).

                flushoutput
                        If telnet is in localchars mode (see toggle localchars below) and the
                        flushoutput character is typed, a TELNET AO sequence (see send ao above)
                        is sent to the remote host.  The initial value for the flush character is
                        taken to be the terminal's flush character.

                forw1

                forw2   If TELNET is operating in LINEMODE, these are the characters that, when
                        typed, cause partial lines to be forwarded to the remote system.  The
                        initial value for the forwarding characters are taken from the terminal's
                        eol and eol2 characters.

                interrupt
                        If telnet is in localchars mode (see toggle localchars below) and the
                        interrupt character is typed, a TELNET IP sequence (see send ip above) is
                        sent to the remote host.  The initial value for the interrupt character
                        is taken to be the terminal's intr character.

                kill    If telnet is in localchars mode (see toggle localchars below), and if
                        telnet is operating in “character at a time” mode, then when this
                        character is typed, a TELNET EL sequence (see send el above) is sent to
                        the remote system.  The initial value for the kill character is taken to
                        be the terminal's kill character.

                lnext   If telnet is operating in LINEMODE or “old line by line“ mode, then this
                        character is taken to be the terminal's lnext character.  The initial
                        value for the lnext character is taken to be the terminal's lnext
                        character.

                quit    If telnet is in localchars mode (see toggle localchars below) and the
                        quit character is typed, a TELNET BRK sequence (see send brk above) is
                        sent to the remote host.  The initial value for the quit character is
                        taken to be the terminal's quit character.

                reprint
                        If telnet is operating in LINEMODE or “old line by line“ mode, then this
                        character is taken to be the terminal's reprint character.  The initial
                        value for the reprint character is taken to be the terminal's reprint
                        character.

                rlogin  This is the rlogin mode escape character. Setting it enables rlogin mode,
                        as with the r command-line option (q.v.)

                start   If the TELNET TOGGLE-FLOW-CONTROL option has been enabled, then this
                        character is taken to be the terminal's start character.  The initial
                        value for the kill character is taken to be the terminal's start
                        character.

                stop    If the TELNET TOGGLE-FLOW-CONTROL option has been enabled, then this
                        character is taken to be the terminal's stop character.  The initial
                        value for the kill character is taken to be the terminal's stop
                        character.

                susp    If telnet is in localchars mode, or LINEMODE is enabled, and the suspend
                        character is typed, a TELNET SUSP sequence (see send susp above) is sent
                        to the remote host.  The initial value for the suspend character is taken
                        to be the terminal's suspend character.

                tracefile
                        This is the file to which the output, caused by netdata or option tracing
                        being TRUE, will be written.  If it is set to “-”, then tracing
                        information will be written to standard output (the default).

                worderase
                        If telnet is operating in LINEMODE or “old line by line“ mode, then this
                        character is taken to be the terminal's worderase character.  The initial
                        value for the worderase character is taken to be the terminal's worderase
                        character.

                ?       Displays the legal set (unset) commands.

     slc state  The slc command (Set Local Characters) is used to set or change the state of the
                the special characters when the TELNET LINEMODE option has been enabled.  Special
                characters are characters that get mapped to TELNET commands sequences (like ip
                or quit) or line editing characters (like erase and kill).  By default, the local
                special characters are exported.

                check       Verify the current settings for the current special characters.  The
                            remote side is requested to send all the current special character
                            settings, and if there are any discrepancies with the local side, the
                            local side will switch to the remote value.

                export      Switch to the local defaults for the special characters.  The local
                            default characters are those of the local terminal at the time when
                            telnet was started.

                import      Switch to the remote defaults for the special characters.  The remote
                            default characters are those of the remote system at the time when
                            the TELNET connection was established.

                ?           Prints out help information for the slc command.

     startssl   Attempt to negotiate telnet-over-SSL (as with the -z ssl option). This is useful
                when connecting to non-telnetds such as imapd (with the STARTTLS command). To
                control SSL when connecting to a SSL-enabled telnetd, use the auth command
                instead.

     status     Show the current status of telnet.  This includes the name of the remote host, if
                any, as well as the current mode.

     toggle arguments ...
                Toggle (between TRUE and FALSE) various flags that control how telnet responds to
                events.  These flags may be set explicitly to TRUE or FALSE using the set and
                unset commands.  More than one flag may be toggled at once.  The state of these
                flags may be examined with the display command.  Valid flags are:

                authdebug     Turns on debugging for the authentication code. This flag only
                              exists if authentication support is enabled.

                autoflush     If autoflush and localchars are both TRUE, then when the ao, or
                              quit characters are recognized (and transformed into TELNET
                              sequences; see set above for details), telnet refuses to display
                              any data on the user's terminal until the remote system
                              acknowledges (via a TELNET TIMING MARK option) that it has
                              processed those TELNET sequences.  The initial value for this
                              toggle is TRUE if the terminal user had not done an "stty noflsh",
                              otherwise FALSE (see stty(1)).

                autologin     If the remote side supports the TELNET AUTHENTICATION option,
                              telnet attempts to use it to perform automatic authentication.  If
                              the TELNET AUTHENTICATION option is not supported, the user's login
                              name is propagated using the TELNET NEW-ENVIRON option.  Setting
                              this flag is the same as specifying the a option to the open
                              command or on the command line.

                autosynch     If autosynch and localchars are both TRUE, then when either the
                              intr or quit characters is typed (see set above for descriptions of
                              the intr and quit characters), the resulting telnet sequence sent
                              is followed by the TELNET SYNCH sequence.  This procedure should
                              cause the remote system to begin throwing away all previously typed
                              input until both of the telnet sequences have been read and acted
                              upon.  The initial value of this toggle is FALSE.

                binary        Enable or disable the TELNET BINARY option on both input and
                              output.

                inbinary      Enable or disable the TELNET BINARY option on input.

                outbinary     Enable or disable the TELNET BINARY option on output.

                crlf          If this is TRUE, then carriage returns will be sent as <CR><LF>.
                              If this is FALSE, then carriage returns will be send as <CR><NUL>.
                              The initial value for this toggle is FALSE.

                crmod         Toggle carriage return mode.  When this mode is enabled, most
                              carriage return characters received from the remote host will be
                              mapped into a carriage return followed by a line feed.  This mode
                              does not affect those characters typed by the user, only those
                              received from the remote host.  This mode is not very useful unless
                              the remote host only sends carriage return, but never line feed.
                              The initial value for this toggle is FALSE.

                debug         Toggles socket level debugging (useful only to the super user).
                              The initial value for this toggle is FALSE.

                localchars    If this is TRUE, then the flush, interrupt, quit, erase, and kill
                              characters (see set above) are recognized locally, and transformed
                              into (hopefully) appropriate TELNET control sequences (respectively
                              ao, ip, brk, ec, and el; see send above).  The initial value for
                              this toggle is TRUE in “old line by line” mode, and FALSE in
                              “character at a time” mode.  When the LINEMODE option is enabled,
                              the value of localchars is ignored, and assumed to always be TRUE.
                              If LINEMODE has ever been enabled, then quit is sent as abort, and
                              eof and suspend are sent as eof and susp, see send above).

                netdata       Toggles the display of all network data (in hexadecimal format).
                              The initial value for this toggle is FALSE.

                options       Toggles the display of some internal telnet protocol processing
                              (having to do with telnet options).  The initial value for this
                              toggle is FALSE.

                prettydump    When the netdata toggle is enabled, if prettydump is enabled the
                              output from the netdata command will be formatted in a more user-
                              readable format.  Spaces are put between each character in the
                              output, and the beginning of telnet escape sequences are preceded
                              by a '*' to aid in locating them.

                skiprc        When the skiprc toggle is TRUE, telnet does not read the telnetrc
                              files.  The initial value for this toggle is FALSE.

                termdata      Toggles the display of all terminal data (in hexadecimal format).
                              The initial value for this toggle is FALSE.

                ?             Displays the legal toggle commands.

     z          Suspend telnet.  This command only works when the user is using the csh(1).

     ! [command]
                Execute a single command in a subshell on the local system.  If command is
                omitted, then an interactive subshell is invoked.

     ? [command]
                Get help.  With no arguments, telnet prints a help summary.  If a command is
                specified, telnet will print the help information for just that command.
```

#### **ENVIRONMENT**

```
     Telnet uses at least the HOME, SHELL, DISPLAY, and TERM environment variables.  Other
     environment variables may be propagated to the other side via the TELNET NEW-ENVIRON option.
     The variable SSL_CIPHER is accessed when setting up encrypted traffic.
```

#### **FILES**

```
     /etc/telnetrc  global telnet startup values
     ~/.telnetrc    user customized telnet startup values
```

#### **HISTORY**

```
     The Telnet command appeared in 4.2BSD.
```

#### **NOTES**

```
     On some remote systems, echo has to be turned off manually when in “old line by line” mode.

     In “old line by line” mode or LINEMODE the terminal's eof character is only recognized (and
     sent to the remote system) when it is the first character on a line.
```

#### **BUGS**

```
     The source code is not comprehensible.
```