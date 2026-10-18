(() => {
'use strict';
const root = document.getElementById('scrying-chamber');
if (!root) return;
const mirror = document.getElementById('mirror');
const begin = document.getElementById('reflection-toggle');
const motion = document.getElementById('motion-toggle');
const next = document.getElementById('prompt-next');
const status = document.getElementById('reflection-status');
const prompt = document.getElementById('reflection-prompt');
const custom = document.getElementById('custom-prompt');
const customFeedback = document.getElementById('custom-prompt-feedback');
const useCustom = document.getElementById('use-custom-prompt');
const resetCustom = document.getElementById('reset-custom-prompt');
const heading = document.getElementById('reflection-heading');
const note = document.getElementById('motion-note');
const prompts = [
 'What would you like to make a little more room for?',
 'What has been quietly asking for your attention?',
 'What can remain unfinished for this moment?',
 'What small kindness could you offer yourself today?',
 'What feels worth carrying forward?',
 'What would a gentler next step look like?'
];
let index = 0, reflecting = false, moving = false;
const preference = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
function motionState() {
 const reduced = !!(preference && preference.matches);
 if (reduced) moving = false;
 mirror.classList.toggle('is-moving', moving);
 mirror.setAttribute('aria-label', moving ? 'A dark ornamental mirror with slowly drifting mist-like shading' : 'A still, dark ornamental mirror with soft mist-like shading');
 motion.setAttribute('aria-pressed', String(moving));
 motion.textContent = moving ? 'Pause gentle motion' : 'Enable gentle motion';
 motion.disabled = reduced;
 note.textContent = reduced ? 'Still mode follows your reduced-motion setting.' : (moving ? 'Soft mist is moving. Pause it whenever you like.' : 'The mist is still. Enable motion for a slow drift.');
}
function endReflection() {
 reflecting = false;
 moving = false;
 root.classList.remove('is-reflecting');
 begin.textContent = 'Begin again';
 begin.setAttribute('aria-pressed', 'false');
 heading.textContent = 'Carry the quiet with you';
 status.textContent = 'Look around your space and take your time. Nothing needs to be solved here.';
 motionState();
}
begin.addEventListener('click', () => {
 if (reflecting) { endReflection(); return; }
 reflecting = true;
 root.classList.add('is-reflecting');
 begin.textContent = 'End reflection';
 begin.setAttribute('aria-pressed', 'true');
 heading.textContent = 'There is nothing to find';
 status.textContent = 'Let your attention rest where it feels comfortable. Look away or end whenever you like. Escape also ends the reflection.';
});
motion.addEventListener('click', () => { if (preference && preference.matches) return; moving = !moving; motionState(); });
next.addEventListener('click', () => { index = (index + 1) % prompts.length; prompt.textContent = prompts[index]; customFeedback.textContent = 'Suggested prompt selected. Your draft stays below until you clear it.'; });
useCustom.addEventListener('click', () => {
 const value = custom.value.trim().slice(0, 240);
 if (!value) { customFeedback.textContent = 'Enter a few words first, or use a suggested prompt.'; custom.focus(); return; }
 custom.value = value;
 prompt.textContent = value;
 customFeedback.textContent = 'Your prompt is now beside the mirror. It is not saved or sent.';
});
resetCustom.addEventListener('click', () => {
 custom.value = '';
 prompt.textContent = prompts[index];
 customFeedback.textContent = 'Your prompt has been cleared. A suggested prompt is showing.';
});
document.addEventListener('keydown', event => {
 if (event.key === 'Escape' && reflecting) { endReflection(); begin.focus(); }
});
if (preference) {
 if (preference.addEventListener) preference.addEventListener('change', motionState);
 else if (preference.addListener) preference.addListener(motionState);
}
motionState();
root.classList.add('js-ready');
})();
