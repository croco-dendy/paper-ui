import rough from 'roughjs';

/** Shared generator instance — stateless, safe to reuse across every rough-drawn component. */
export const roughGenerator = rough.generator();
