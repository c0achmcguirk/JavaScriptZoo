# A sample Guardfile
# More info at https://github.com/guard/guard#readme

# Add files and commands to this file, like the example:
#   watch(%r{file/path}) { `command(s)` }

ignore %r{^WebUI/scripts/(.*)\.swp}

notification :growl_notify

guard :shell do
  watch %r{^WebUI/scripts/.*.(ts|coffee)$} do |m|  
    #n m[0], " file has changed. ................", :success
    `bin/compile.sh`
    #n m[0], 'Changed'
    # `say "File changed, #{m[0]}"`
    `growlnotify -m "File changed, #{m[0]}"`
  end
end
