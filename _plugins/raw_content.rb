# Copy Markdown raw content for later use
Jekyll::Hooks.register :documents, :pre_render do |document|
  document.data['raw_content'] = document.content
end
