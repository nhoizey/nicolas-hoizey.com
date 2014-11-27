environment = :development
# environment = :production

# Set this to the root of your project when deployed:
http_path = "/"
sass_dir = "src/scss"
css_dir = "build/css"
images_dir = "build/img"
javascripts_dir = "build/js"
fonts_dir = "build/fonts"

# Number of decimals after commas, useful for em accuracy
Sass::Script::Number.precision = 10

# Set the project's environment
default_external = "utf-8"

if  environment == :production
    output_style = :compressed
else
   output_style =   :expanded
   sass_options = { :debug_info => true }
end

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true
line_comments   = false
color_output    = false
