+++
title = "16 Makefile Conventions"
date = 2023-08-21T17:08:26+08:00
weight = 160
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# 16 Makefile Conventions

https://www.gnu.org/software/make/manual/make.html#Makefile-Conventions



This describes conventions for writing the Makefiles for GNU programs. Using Automake will help you write a Makefile that follows these conventions. For more information on portable Makefiles, see POSIX and [Portable Make Programming](https://www.gnu.org/software/autoconf/manual/autoconf.html#Portable-Make) in Autoconf.







## 16.1 General Conventions for Makefiles

Every Makefile should contain this line:

```
SHELL = /bin/sh
```

to avoid trouble on systems where the `SHELL` variable might be inherited from the environment. (This is never a problem with GNU `make`.)

Different `make` programs have incompatible suffix lists and implicit rules, and this sometimes creates confusion or misbehavior. So it is a good idea to set the suffix list explicitly using only the suffixes you need in the particular Makefile, like this:

```
.SUFFIXES:
.SUFFIXES: .c .o
```

The first line clears out the suffix list, the second introduces all suffixes which may be subject to implicit rules in this Makefile.

Don’t assume that . is in the path for command execution. When you need to run programs that are a part of your package during the make, please make sure that it uses ./ if the program is built as part of the make or $(srcdir)/ if the file is an unchanging part of the source code. Without one of these prefixes, the current search path is used.

The distinction between ./ (the *build directory*) and $(srcdir)/ (the *source directory*) is important because users can build in a separate directory using the ‘--srcdir’ option to configure. A rule of the form:

```
foo.1 : foo.man sedscript
        sed -f sedscript foo.man > foo.1
```

will fail when the build directory is not the source directory, because foo.man and sedscript are in the source directory.

When using GNU `make`, relying on ‘VPATH’ to find the source file will work in the case where there is a single dependency file, since the `make` automatic variable ‘$<’ will represent the source file wherever it is. (Many versions of `make` set ‘$<’ only in implicit rules.) A Makefile target like

```
foo.o : bar.c
        $(CC) -I. -I$(srcdir) $(CFLAGS) -c bar.c -o foo.o
```

should instead be written as

```
foo.o : bar.c
        $(CC) -I. -I$(srcdir) $(CFLAGS) -c $< -o $@
```

in order to allow ‘VPATH’ to work correctly. When the target has multiple dependencies, using an explicit ‘$(srcdir)’ is the easiest way to make the rule work well. For example, the target above for foo.1 is best written as:

```
foo.1 : foo.man sedscript
        sed -f $(srcdir)/sedscript $(srcdir)/foo.man > $@
```

GNU distributions usually contain some files which are not source files—for example, Info files, and the output from Autoconf, Automake, Bison or Flex. Since these files normally appear in the source directory, they should always appear in the source directory, not in the build directory. So Makefile rules to update them should put the updated files in the source directory.

However, if a file does not appear in the distribution, then the Makefile should not put it in the source directory, because building a program in ordinary circumstances should not modify the source directory in any way.

Try to make the build and installation targets, at least (and all their subtargets) work correctly with a parallel `make`.





## 16.2 Utilities in Makefiles

Write the Makefile commands (and any shell scripts, such as `configure`) to run under `sh` (both the traditional Bourne shell and the POSIX shell), not `csh`. Don’t use any special features of `ksh` or `bash`, or POSIX features not widely supported in traditional Bourne `sh`.

The `configure` script and the Makefile rules for building and installation should not use any utilities directly except these:

```
awk cat cmp cp diff echo expr false grep install-info ln ls
mkdir mv printf pwd rm rmdir sed sleep sort tar test touch tr true
```

Compression programs such as `gzip` can be used in the `dist` rule.

Generally, stick to the widely-supported (usually POSIX-specified) options and features of these programs. For example, don’t use ‘mkdir -p’, convenient as it may be, because a few systems don’t support it at all and with others, it is not safe for parallel execution. For a list of known incompatibilities, see [Portable Shell Programming](https://www.gnu.org/software/autoconf/manual/autoconf.html#Portable-Shell) in Autoconf.

It is a good idea to avoid creating symbolic links in makefiles, since a few file systems don’t support them.

The Makefile rules for building and installation can also use compilers and related programs, but should do so via `make` variables so that the user can substitute alternatives. Here are some of the programs we mean:

```
ar bison cc flex install ld ldconfig lex
make makeinfo ranlib texi2dvi yacc
```

Use the following `make` variables to run those programs:

```
$(AR) $(BISON) $(CC) $(FLEX) $(INSTALL) $(LD) $(LDCONFIG) $(LEX)
$(MAKE) $(MAKEINFO) $(RANLIB) $(TEXI2DVI) $(YACC)
```

When you use `ranlib` or `ldconfig`, you should make sure nothing bad happens if the system does not have the program in question. Arrange to ignore an error from that command, and print a message before the command to tell the user that failure of this command does not mean a problem. (The Autoconf ‘AC_PROG_RANLIB’ macro can help with this.)

If you use symbolic links, you should implement a fallback for systems that don’t have symbolic links.

Additional utilities that can be used via Make variables are:

```
chgrp chmod chown mknod
```

It is ok to use other utilities in Makefile portions (or scripts) intended only for particular systems where you know those utilities exist.





16.3 Variables for Specifying Commands

Makefiles should provide variables for overriding certain commands, options, and so on.

In particular, you should run most utility programs via variables. Thus, if you use Bison, have a variable named `BISON` whose default value is set with ‘BISON = bison’, and refer to it with `$(BISON)` whenever you need to use Bison.

File management utilities such as `ln`, `rm`, `mv`, and so on, need not be referred to through variables in this way, since users don’t need to replace them with other programs.

Each program-name variable should come with an options variable that is used to supply options to the program. Append ‘FLAGS’ to the program-name variable name to get the options variable name—for example, `BISONFLAGS`. (The names `CFLAGS` for the C compiler, `YFLAGS` for yacc, and `LFLAGS` for lex, are exceptions to this rule, but we keep them because they are standard.) Use `CPPFLAGS` in any compilation command that runs the preprocessor, and use `LDFLAGS` in any compilation command that does linking as well as in any direct use of `ld`.

If there are C compiler options that *must* be used for proper compilation of certain files, do not include them in `CFLAGS`. Users expect to be able to specify `CFLAGS` freely themselves. Instead, arrange to pass the necessary options to the C compiler independently of `CFLAGS`, by writing them explicitly in the compilation commands or by defining an implicit rule, like this:

```
CFLAGS = -g
ALL_CFLAGS = -I. $(CFLAGS)
.c.o:
        $(CC) -c $(CPPFLAGS) $(ALL_CFLAGS) $<
```

Do include the ‘-g’ option in `CFLAGS`, because that is not *required* for proper compilation. You can consider it a default that is only recommended. If the package is set up so that it is compiled with GCC by default, then you might as well include ‘-O’ in the default value of `CFLAGS` as well.

Put `CFLAGS` last in the compilation command, after other variables containing compiler options, so the user can use `CFLAGS` to override the others.

`CFLAGS` should be used in every invocation of the C compiler, both those which do compilation and those which do linking.

Every Makefile should define the variable `INSTALL`, which is the basic command for installing a file into the system.

Every Makefile should also define the variables `INSTALL_PROGRAM` and `INSTALL_DATA`. (The default for `INSTALL_PROGRAM` should be `$(INSTALL)`; the default for `INSTALL_DATA` should be `${INSTALL} -m 644`.) Then it should use those variables as the commands for actual installation, for executables and non-executables respectively. Minimal use of these variables is as follows:

```
$(INSTALL_PROGRAM) foo $(bindir)/foo
$(INSTALL_DATA) libfoo.a $(libdir)/libfoo.a
```

However, it is preferable to support a `DESTDIR` prefix on the target files, as explained in the next section.

It is acceptable, but not required, to install multiple files in one command, with the final argument being a directory, as in:

```
$(INSTALL_PROGRAM) foo bar baz $(bindir)
```





## 16.4 `DESTDIR`: Support for Staged Installs



`DESTDIR` is a variable prepended to each installed target file, like this:

```
$(INSTALL_PROGRAM) foo $(DESTDIR)$(bindir)/foo
$(INSTALL_DATA) libfoo.a $(DESTDIR)$(libdir)/libfoo.a
```

The `DESTDIR` variable is specified by the user on the `make` command line as an absolute file name. For example:

```
make DESTDIR=/tmp/stage install
```

`DESTDIR` should be supported only in the `install*` and `uninstall*` targets, as those are the only targets where it is useful.

If your installation step would normally install /usr/local/bin/foo and /usr/local/lib/libfoo.a, then an installation invoked as in the example above would install /tmp/stage/usr/local/bin/foo and /tmp/stage/usr/local/lib/libfoo.a instead.

Prepending the variable `DESTDIR` to each target in this way provides for *staged installs*, where the installed files are not placed directly into their expected location but are instead copied into a temporary location (`DESTDIR`). However, installed files maintain their relative directory structure and any embedded file names will not be modified.

You should not set the value of `DESTDIR` in your Makefile at all; then the files are installed into their expected locations by default. Also, specifying `DESTDIR` should not change the operation of the software in any way, so its value should not be included in any file contents.

`DESTDIR` support is commonly used in package creation. It is also helpful to users who want to understand what a given package will install where, and to allow users who don’t normally have permissions to install into protected areas to build and install before gaining those permissions. Finally, it can be useful with tools such as `stow`, where code is installed in one place but made to appear to be installed somewhere else using symbolic links or special mount operations. So, we strongly recommend GNU packages support `DESTDIR`, though it is not an absolute requirement.





## 16.5 Variables for Installation Directories

Installation directories should always be named by variables, so it is easy to install in a nonstandard place. The standard names for these variables and the values they should have in GNU packages are described below. They are based on a standard file system layout; variants of it are used in GNU/Linux and other modern operating systems.

Installers are expected to override these values when calling `make` (e.g., make prefix=/usr install) or `configure` (e.g., configure --prefix=/usr). GNU packages should not try to guess which value should be appropriate for these variables on the system they are being installed onto: use the default settings specified here so that all GNU packages behave identically, allowing the installer to achieve any desired layout.



All installation directories, and their parent directories, should be created (if necessary) before they are installed into.

These first two variables set the root for the installation. All the other installation directories should be subdirectories of one of these two, and nothing should be directly installed into these two directories.

- `prefix`

  A prefix used in constructing the default values of the variables listed below. The default value of `prefix` should be /usr/local. When building the complete GNU system, the prefix will be empty and /usr will be a symbolic link to /. (If you are using Autoconf, write it as ‘@prefix@’.)Running ‘make install’ with a different value of `prefix` from the one used to build the program should *not* recompile the program.

- `exec_prefix`

  A prefix used in constructing the default values of some of the variables listed below. The default value of `exec_prefix` should be `$(prefix)`. (If you are using Autoconf, write it as ‘@exec_prefix@’.)Generally, `$(exec_prefix)` is used for directories that contain machine-specific files (such as executables and subroutine libraries), while `$(prefix)` is used directly for other directories.Running ‘make install’ with a different value of `exec_prefix` from the one used to build the program should *not* recompile the program.

Executable programs are installed in one of the following directories.

- `bindir`

  The directory for installing executable programs that users can run. This should normally be /usr/local/bin, but write it as $(exec_prefix)/bin. (If you are using Autoconf, write it as ‘@bindir@’.)

- `sbindir`

  The directory for installing executable programs that can be run from the shell, but are only generally useful to system administrators. This should normally be /usr/local/sbin, but write it as $(exec_prefix)/sbin. (If you are using Autoconf, write it as ‘@sbindir@’.)

- `libexecdir`

  The directory for installing executable programs to be run by other programs rather than by users. This directory should normally be /usr/local/libexec, but write it as `$(exec_prefix)/libexec`. (If you are using Autoconf, write it as ‘@libexecdir@’.)The definition of ‘libexecdir’ is the same for all packages, so you should install your data in a subdirectory thereof. Most packages install their data under `$(libexecdir)/package-name/`, possibly within additional subdirectories thereof, such as `$(libexecdir)/package-name/machine/version`.

Data files used by the program during its execution are divided into categories in two ways.

- Some files are normally modified by programs; others are never normally modified (though users may edit some of these).
- Some files are architecture-independent and can be shared by all machines at a site; some are architecture-dependent and can be shared only by machines of the same kind and operating system; others may never be shared between two machines.

This makes for six different possibilities. However, we want to discourage the use of architecture-dependent files, aside from object files and libraries. It is much cleaner to make other data files architecture-independent, and it is generally not hard.

Here are the variables Makefiles should use to specify directories to put these various kinds of files in:

- ‘datarootdir’

  The root of the directory tree for read-only architecture-independent data files. This should normally be /usr/local/share, but write it as $(prefix)/share. (If you are using Autoconf, write it as ‘@datarootdir@’.) ‘datadir’’s default value is based on this variable; so are ‘infodir’, ‘mandir’, and others.

- ‘datadir’

  The directory for installing idiosyncratic read-only architecture-independent data files for this program. This is usually the same place as ‘datarootdir’, but we use the two separate variables so that you can move these program-specific files without altering the location for Info files, man pages, etc.This should normally be /usr/local/share, but write it as `$(datarootdir)`. (If you are using Autoconf, write it as ‘@datadir@’.)The definition of ‘datadir’ is the same for all packages, so you should install your data in a subdirectory thereof. Most packages install their data under $(datadir)/package-name/.

- ‘sysconfdir’

  The directory for installing read-only data files that pertain to a single machine–that is to say, files for configuring a host. Mailer and network configuration files, /etc/passwd, and so forth belong here. All the files in this directory should be ordinary ASCII text files. This directory should normally be /usr/local/etc, but write it as `$(prefix)/etc`. (If you are using Autoconf, write it as ‘@sysconfdir@’.)Do not install executables here in this directory (they probably belong in $(libexecdir) or $(sbindir)). Also do not install files that are modified in the normal course of their use (programs whose purpose is to change the configuration of the system excluded). Those probably belong in $(localstatedir).

- ‘sharedstatedir’

  The directory for installing architecture-independent data files which the programs modify while they run. This should normally be /usr/local/com, but write it as $(prefix)/com. (If you are using Autoconf, write it as ‘@sharedstatedir@’.)

- ‘localstatedir’

  The directory for installing data files which the programs modify while they run, and that pertain to one specific machine. Users should never need to modify files in this directory to configure the package’s operation; put such configuration information in separate files that go in `$(datadir)` or `$(sysconfdir)`. `$(localstatedir)` should normally be /usr/local/var, but write it as `$(prefix)/var`. (If you are using Autoconf, write it as ‘@localstatedir@’.)

- ‘runstatedir’

  The directory for installing data files which the programs modify while they run, that pertain to one specific machine, and which need not persist longer than the execution of the program—which is generally long-lived, for example, until the next reboot. PID files for system daemons are a typical use. In addition, this directory should not be cleaned except perhaps at reboot, while the general /tmp (`TMPDIR`) may be cleaned arbitrarily. This should normally be /var/run, but write it as $(localstatedir)/run. Having it as a separate variable allows the use of /run if desired, for example. (If you are using Autoconf 2.70 or later, write it as ‘@runstatedir@’.)

These variables specify the directory for installing certain specific types of files, if your program has them. Every GNU package should have Info files, so every program needs ‘infodir’, but not all need ‘libdir’ or ‘lispdir’.

- ‘includedir’

  The directory for installing header files to be included by user programs with the C ‘#include’ preprocessor directive. This should normally be /usr/local/include, but write it as $(prefix)/include. (If you are using Autoconf, write it as ‘@includedir@’.)Most compilers other than GCC do not look for header files in directory /usr/local/include. So installing the header files this way is only useful with GCC. Sometimes this is not a problem because some libraries are only really intended to work with GCC. But some libraries are intended to work with other compilers. They should install their header files in two places, one specified by `includedir` and one specified by `oldincludedir`.

- ‘oldincludedir’

  The directory for installing ‘#include’ header files for use with compilers other than GCC. This should normally be /usr/include. (If you are using Autoconf, you can write it as ‘@oldincludedir@’.)The Makefile commands should check whether the value of `oldincludedir` is empty. If it is, they should not try to use it; they should cancel the second installation of the header files.A package should not replace an existing header in this directory unless the header came from the same package. Thus, if your Foo package provides a header file foo.h, then it should install the header file in the `oldincludedir` directory if either (1) there is no foo.h there or (2) the foo.h that exists came from the Foo package.To tell whether foo.h came from the Foo package, put a magic string in the file—part of a comment—and `grep` for that string.

- ‘docdir’

  The directory for installing documentation files (other than Info) for this package. By default, it should be /usr/local/share/doc/yourpkg, but it should be written as $(datarootdir)/doc/yourpkg. (If you are using Autoconf, write it as ‘@docdir@’.) The yourpkg subdirectory, which may include a version number, prevents collisions among files with common names, such as README.

- ‘infodir’

  The directory for installing the Info files for this package. By default, it should be /usr/local/share/info, but it should be written as $(datarootdir)/info. (If you are using Autoconf, write it as ‘@infodir@’.) `infodir` is separate from `docdir` for compatibility with existing practice.

- ‘htmldir’

- ‘dvidir’

- ‘pdfdir’

- ‘psdir’

  Directories for installing documentation files in the particular format. They should all be set to `$(docdir)` by default. (If you are using Autoconf, write them as ‘@htmldir@’, ‘@dvidir@’, etc.) Packages which supply several translations of their documentation should install them in ‘$(htmldir)/’ll, ‘$(pdfdir)/’ll, etc. where ll is a locale abbreviation such as ‘en’ or ‘pt_BR’.

- ‘libdir’

  The directory for object files and libraries of object code. Do not install executables here, they probably ought to go in $(libexecdir) instead. The value of `libdir` should normally be /usr/local/lib, but write it as $(exec_prefix)/lib. (If you are using Autoconf, write it as ‘@libdir@’.)

- ‘lispdir’

  The directory for installing any Emacs Lisp files in this package. By default, it should be /usr/local/share/emacs/site-lisp, but it should be written as $(datarootdir)/emacs/site-lisp.If you are using Autoconf, write the default as ‘@lispdir@’. In order to make ‘@lispdir@’ work, you need the following lines in your configure.ac file:

  ```
  lispdir='${datarootdir}/emacs/site-lisp'
  AC_SUBST(lispdir)
  ```

  

- ‘localedir’

  The directory for installing locale-specific message catalogs for this package. By default, it should be /usr/local/share/locale, but it should be written as $(datarootdir)/locale. (If you are using Autoconf, write it as ‘@localedir@’.) This directory usually has a subdirectory per locale.

Unix-style man pages are installed in one of the following:

- ‘mandir’

  The top-level directory for installing the man pages (if any) for this package. It will normally be /usr/local/share/man, but you should write it as $(datarootdir)/man. (If you are using Autoconf, write it as ‘@mandir@’.)

- ‘man1dir’

  The directory for installing section 1 man pages. Write it as $(mandir)/man1.

- ‘man2dir’

  The directory for installing section 2 man pages. Write it as $(mandir)/man2

- ‘…’

  **Don’t make the primary documentation for any GNU software be a man page. Write a manual in Texinfo instead. Man pages are just for the sake of people running GNU software on Unix, which is a secondary application only.**

- ‘manext’

  The file name extension for the installed man page. This should contain a period followed by the appropriate digit; it should normally be ‘.1’.

- ‘man1ext’

  The file name extension for installed section 1 man pages.

- ‘man2ext’

  The file name extension for installed section 2 man pages.

- ‘…’

  Use these names instead of ‘manext’ if the package needs to install man pages in more than one section of the manual.

And finally, you should set the following variable:

- ‘srcdir’

  The directory for the sources being compiled. The value of this variable is normally inserted by the `configure` shell script. (If you are using Autoconf, use ‘srcdir = @srcdir@’.)

For example:

```
# Common prefix for installation directories.
# NOTE: This directory must exist when you start the install.
prefix = /usr/local
datarootdir = $(prefix)/share
datadir = $(datarootdir)
exec_prefix = $(prefix)
# Where to put the executable for the command 'gcc'.
bindir = $(exec_prefix)/bin
# Where to put the directories used by the compiler.
libexecdir = $(exec_prefix)/libexec
# Where to put the Info files.
infodir = $(datarootdir)/info
```

If your program installs a large number of files into one of the standard user-specified directories, it might be useful to group them into a subdirectory particular to that program. If you do this, you should write the `install` rule to create these subdirectories.

Do not expect the user to include the subdirectory name in the value of any of the variables listed above. The idea of having a uniform set of variable names for installation directories is to enable the user to specify the exact same values for several different GNU packages. In order for this to be useful, all the packages must be designed so that they will work sensibly when the user does so.

At times, not all of these variables may be implemented in the current release of Autoconf and/or Automake; but as of Autoconf 2.60, we believe all of them are. When any are missing, the descriptions here serve as specifications for what Autoconf will implement. As a programmer, you can either use a development version of Autoconf or avoid using these variables until a stable release is made which supports them.





## 16.6 Standard Targets for Users

All GNU programs should have the following targets in their Makefiles:

- ‘all’

  Compile the entire program. This should be the default target. This target need not rebuild any documentation files; Info files should normally be included in the distribution, and DVI (and other documentation format) files should be made only when explicitly asked for.By default, the Make rules should compile and link with ‘-g’, so that executable programs have debugging symbols. Otherwise, you are essentially helpless in the face of a crash, and it is often far from easy to reproduce with a fresh build.

- ‘install’

  Compile the program and copy the executables, libraries, and so on to the file names where they should reside for actual use. If there is a simple test to verify that a program is properly installed, this target should run that test.Do not strip executables when installing them. This helps eventual debugging that may be needed later, and nowadays disk space is cheap and dynamic loaders typically ensure debug sections are not loaded during normal execution. Users that need stripped binaries may invoke the `install-strip` target to do that.If possible, write the `install` target rule so that it does not modify anything in the directory where the program was built, provided ‘make all’ has just been done. This is convenient for building the program under one user name and installing it under another.The commands should create all the directories in which files are to be installed, if they don’t already exist. This includes the directories specified as the values of the variables `prefix` and `exec_prefix`, as well as all subdirectories that are needed. One way to do this is by means of an `installdirs` target as described below.Use ‘-’ before any command for installing a man page, so that `make` will ignore any errors. This is in case there are systems that don’t have the Unix man page documentation system installed.The way to install Info files is to copy them into $(infodir) with `$(INSTALL_DATA)` (see [Variables for Specifying Commands](https://www.gnu.org/software/make/manual/make.html#Command-Variables)), and then run the `install-info` program if it is present. `install-info` is a program that edits the Info dir file to add or update the menu entry for the given Info file; it is part of the Texinfo package.Here is a sample rule to install an Info file that also tries to handle some additional situations, such as `install-info` not being present.

  ```
  do-install-info: foo.info installdirs
          $(NORMAL_INSTALL)
  # Prefer an info file in . to one in srcdir.
          if test -f foo.info; then d=.; \
           else d="$(srcdir)"; fi; \
          $(INSTALL_DATA) $$d/foo.info \
            "$(DESTDIR)$(infodir)/foo.info"
  # Run install-info only if it exists.
  # Use 'if' instead of just prepending '-' to the
  # line so we notice real errors from install-info.
  # Use '$(SHELL) -c' because some shells do not
  # fail gracefully when there is an unknown command.
          $(POST_INSTALL)
          if $(SHELL) -c 'install-info --version' \
             >/dev/null 2>&1; then \
            install-info --dir-file="$(DESTDIR)$(infodir)/dir" \
                         "$(DESTDIR)$(infodir)/foo.info"; \
          else true; fi
  ```

  When writing the `install` target, you must classify all the commands into three categories: normal ones, *pre-installation* commands and *post-installation* commands. See [Install Command Categories](https://www.gnu.org/software/make/manual/make.html#Install-Command-Categories).

- ‘install-html’

- ‘install-dvi’

- ‘install-pdf’

- ‘install-ps’

  These targets install documentation in formats other than Info; they’re intended to be called explicitly by the person installing the package, if that format is desired. GNU prefers Info files, so these must be installed by the `install` target.When you have many documentation files to install, we recommend that you avoid collisions and clutter by arranging for these targets to install in subdirectories of the appropriate installation directory, such as `htmldir`. As one example, if your package has multiple manuals, and you wish to install HTML documentation with many files (such as the “split” mode output by `makeinfo --html`), you’ll certainly want to use subdirectories, or two nodes with the same name in different manuals will overwrite each other.Please make these `install-format` targets invoke the commands for the format target, for example, by making format a dependency.

- ‘uninstall’

  Delete all the installed files—the copies that the ‘install’ and ‘install-*’ targets create.This rule should not modify the directories where compilation is done, only the directories where files are installed.The uninstallation commands are divided into three categories, just like the installation commands. See [Install Command Categories](https://www.gnu.org/software/make/manual/make.html#Install-Command-Categories).

- ‘install-strip’

  Like `install`, but strip the executable files while installing them. In simple cases, this target can use the `install` target in a simple way:

  ```
  install-strip:
          $(MAKE) INSTALL_PROGRAM='$(INSTALL_PROGRAM) -s' \
                  install
  ```

  But if the package installs scripts as well as real executables, the `install-strip` target can’t just refer to the `install` target; it has to strip the executables but not the scripts.`install-strip` should not strip the executables in the build directory which are being copied for installation. It should only strip the copies that are installed.Normally we do not recommend stripping an executable unless you are sure the program has no bugs. However, it can be reasonable to install a stripped executable for actual execution while saving the unstripped executable elsewhere in case there is a bug.

- ‘clean’

  Delete all files in the current directory that are normally created by building the program. Also delete files in other directories if they are created by this makefile. However, don’t delete the files that record the configuration. Also preserve files that could be made by building, but normally aren’t because the distribution comes with them. There is no need to delete parent directories that were created with ‘mkdir -p’, since they could have existed anyway.Delete .dvi files here if they are not part of the distribution.

- ‘distclean’

  Delete all files in the current directory (or created by this makefile) that are created by configuring or building the program. If you have unpacked the source and built the program without creating any other files, ‘make distclean’ should leave only the files that were in the distribution. However, there is no need to delete parent directories that were created with ‘mkdir -p’, since they could have existed anyway.

- ‘mostlyclean’

  Like ‘clean’, but may refrain from deleting a few files that people normally don’t want to recompile. For example, the ‘mostlyclean’ target for GCC does not delete libgcc.a, because recompiling it is rarely necessary and takes a lot of time.

- ‘maintainer-clean’

  Delete almost everything that can be reconstructed with this Makefile. This typically includes everything deleted by `distclean`, plus more: C source files produced by Bison, tags tables, Info files, and so on.The reason we say “almost everything” is that running the command ‘make maintainer-clean’ should not delete configure even if configure can be remade using a rule in the Makefile. More generally, ‘make maintainer-clean’ should not delete anything that needs to exist in order to run configure and then begin to build the program. Also, there is no need to delete parent directories that were created with ‘mkdir -p’, since they could have existed anyway. These are the only exceptions; `maintainer-clean` should delete everything else that can be rebuilt.The ‘maintainer-clean’ target is intended to be used by a maintainer of the package, not by ordinary users. You may need special tools to reconstruct some of the files that ‘make maintainer-clean’ deletes. Since these files are normally included in the distribution, we don’t take care to make them easy to reconstruct. If you find you need to unpack the full distribution again, don’t blame us.To help make users aware of this, the commands for the special `maintainer-clean` target should start with these two:

  ```
  @echo 'This command is intended for maintainers to use; it'
  @echo 'deletes files that may need special tools to rebuild.'
  ```

  

- ‘TAGS’

  Update a tags table for this program.

- ‘info’

  Generate any Info files needed. The best way to write the rules is as follows:

  ```
  info: foo.info
  
  foo.info: foo.texi chap1.texi chap2.texi
          $(MAKEINFO) $(srcdir)/foo.texi
  ```

  You must define the variable `MAKEINFO` in the Makefile. It should run the `makeinfo` program, which is part of the Texinfo distribution.Normally a GNU distribution comes with Info files, and that means the Info files are present in the source directory. Therefore, the Make rule for an info file should update it in the source directory. When users build the package, ordinarily Make will not update the Info files because they will already be up to date.

- ‘dvi’

- ‘html’

- ‘pdf’

- ‘ps’

  Generate documentation files in the given format. These targets should always exist, but any or all can be a no-op if the given output format cannot be generated. These targets should not be dependencies of the `all` target; the user must manually invoke them.Here’s an example rule for generating DVI files from Texinfo:

  ```
  dvi: foo.dvi
  
  foo.dvi: foo.texi chap1.texi chap2.texi
          $(TEXI2DVI) $(srcdir)/foo.texi
  ```

  You must define the variable `TEXI2DVI` in the Makefile. It should run the program `texi2dvi`, which is part of the Texinfo distribution. (`texi2dvi` uses TeX to do the real work of formatting. TeX is not distributed with Texinfo.) Alternatively, write only the dependencies, and allow GNU `make` to provide the command.Here’s another example, this one for generating HTML from Texinfo:

  ```
  html: foo.html
  
  foo.html: foo.texi chap1.texi chap2.texi
          $(TEXI2HTML) $(srcdir)/foo.texi
  ```

  Again, you would define the variable `TEXI2HTML` in the Makefile; for example, it might run `makeinfo --no-split --html` (`makeinfo` is part of the Texinfo distribution).

- ‘dist’

  Create a distribution tar file for this program. The tar file should be set up so that the file names in the tar file start with a subdirectory name which is the name of the package it is a distribution for. This name can include the version number.For example, the distribution tar file of GCC version 1.40 unpacks into a subdirectory named gcc-1.40.The easiest way to do this is to create a subdirectory appropriately named, use `ln` or `cp` to install the proper files in it, and then `tar` that subdirectory.Compress the tar file with `gzip`. For example, the actual distribution file for GCC version 1.40 is called gcc-1.40.tar.gz. It is ok to support other free compression formats as well.The `dist` target should explicitly depend on all non-source files that are in the distribution, to make sure they are up to date in the distribution. See [Making Releases](https://www.gnu.org/prep/standards/standards.html#Releases) in GNU Coding Standards.

- ‘check’

  Perform self-tests (if any). The user must build the program before running the tests, but need not install the program; you should write the self-tests so that they work when the program is built but not installed.

The following targets are suggested as conventional names, for programs in which they are useful.

- `installcheck`

  Perform installation tests (if any). The user must build and install the program before running the tests. You should not assume that $(bindir) is in the search path.

- `installdirs`

  It’s useful to add a target named ‘installdirs’ to create the directories where files are installed, and their parent directories. There is a script called mkinstalldirs which is convenient for this; you can find it in the Gnulib package. You can use a rule like this:

  ```
  # Make sure all installation directories (e.g. $(bindir))
  # actually exist by making them if necessary.
  installdirs: mkinstalldirs
          $(srcdir)/mkinstalldirs $(bindir) $(datadir) \
                                  $(libdir) $(infodir) \
                                  $(mandir)
  ```

  or, if you wish to support `DESTDIR` (strongly encouraged),

  ```
  # Make sure all installation directories (e.g. $(bindir))
  # actually exist by making them if necessary.
  installdirs: mkinstalldirs
          $(srcdir)/mkinstalldirs \
              $(DESTDIR)$(bindir) $(DESTDIR)$(datadir) \
              $(DESTDIR)$(libdir) $(DESTDIR)$(infodir) \
              $(DESTDIR)$(mandir)
  ```

  This rule should not modify the directories where compilation is done. It should do nothing but create installation directories.





### 16.7 Install Command Categories



When writing the `install` target, you must classify all the commands into three categories: normal ones, *pre-installation* commands and *post-installation* commands.

Normal commands move files into their proper places, and set their modes. They may not alter any files except the ones that come entirely from the package they belong to.

Pre-installation and post-installation commands may alter other files; in particular, they can edit global configuration files or data bases.

Pre-installation commands are typically executed before the normal commands, and post-installation commands are typically run after the normal commands.

The most common use for a post-installation command is to run `install-info`. This cannot be done with a normal command, since it alters a file (the Info directory) which does not come entirely and solely from the package being installed. It is a post-installation command because it needs to be done after the normal command which installs the package’s Info files.

Most programs don’t need any pre-installation commands, but we have the feature just in case it is needed.

To classify the commands in the `install` rule into these three categories, insert *category lines* among them. A category line specifies the category for the commands that follow.

A category line consists of a tab and a reference to a special Make variable, plus an optional comment at the end. There are three variables you can use, one for each category; the variable name specifies the category. Category lines are no-ops in ordinary execution because these three Make variables are normally undefined (and you *should not* define them in the makefile).

Here are the three possible category lines, each with a comment that explains what it means:

```
        $(PRE_INSTALL)     # Pre-install commands follow.
        $(POST_INSTALL)    # Post-install commands follow.
        $(NORMAL_INSTALL)  # Normal commands follow.
```

If you don’t use a category line at the beginning of the `install` rule, all the commands are classified as normal until the first category line. If you don’t use any category lines, all the commands are classified as normal.

These are the category lines for `uninstall`:

```
        $(PRE_UNINSTALL)     # Pre-uninstall commands follow.
        $(POST_UNINSTALL)    # Post-uninstall commands follow.
        $(NORMAL_UNINSTALL)  # Normal commands follow.
```

Typically, a pre-uninstall command would be used for deleting entries from the Info directory.

If the `install` or `uninstall` target has any dependencies which act as subroutines of installation, then you should start *each* dependency’s commands with a category line, and start the main target’s commands with a category line also. This way, you can ensure that each command is placed in the right category regardless of which of the dependencies actually run.

Pre-installation and post-installation commands should not run any programs except for these:

```
[ basename bash cat chgrp chmod chown cmp cp dd diff echo
expand expr false find getopt grep gunzip gzip
hostname install install-info kill ldconfig ln ls md5sum
mkdir mkfifo mknod mv printenv pwd rm rmdir sed sort tee
test touch true uname xargs yes
```



The reason for distinguishing the commands in this way is for the sake of making binary packages. Typically a binary package contains all the executables and other files that need to be installed, and has its own method of installing them—so it does not need to run the normal installation commands. But installing the binary package does need to execute the pre-installation and post-installation commands.

Programs to build binary packages work by extracting the pre-installation and post-installation commands. Here is one way of extracting the pre-installation commands (the -s option to `make` is needed to silence messages about entering subdirectories):

```
make -s -n install -o all \
      PRE_INSTALL=pre-install \
      POST_INSTALL=post-install \
      NORMAL_INSTALL=normal-install \
  | gawk -f pre-install.awk
```

where the file pre-install.awk could contain this:

```
$0 ~ /^(normal-install|post-install)[ \t]*$/ {on = 0}
on {print $0}
$0 ~ /^pre-install[ \t]*$/ {on = 1}
```