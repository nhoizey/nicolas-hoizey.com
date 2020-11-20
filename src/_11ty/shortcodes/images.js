module.exports = {
  icon: (id, label) => `
<svg class="icon" role="img" aria-label="${label}" focusable="false">
  <use xlink:href="#symbol-${id}" />
</svg>
`,
};
