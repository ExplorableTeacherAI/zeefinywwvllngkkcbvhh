/**
 * Variables Configuration
 * =======================
 *
 * Sum of Consecutive Odd Numbers Lesson
 */

import { type VarValue } from '@/stores';

/**
 * Variable definition with metadata
 */
export interface VariableDefinition {
    /** Default value */
    defaultValue: VarValue;
    /** Human-readable label */
    label?: string;
    /** Description for AI agents */
    description?: string;
    /** Variable type hint */
    type?: 'number' | 'text' | 'boolean' | 'select' | 'array' | 'object' | 'spotColor' | 'linkedHighlight';
    /** Unit (e.g., 'Hz', '°', 'm/s') - for numbers */
    unit?: string;
    /** Minimum value (for number sliders) */
    min?: number;
    /** Maximum value (for number sliders) */
    max?: number;
    /** Step increment (for number sliders) */
    step?: number;
    /** Display color for InlineScrubbleNumber / InlineSpotColor (e.g. '#D81B60') */
    color?: string;
    /** Options for 'select' type variables */
    options?: string[];
    /** Placeholder text for text inputs */
    placeholder?: string;
    /** Correct answer for cloze input validation */
    correctAnswer?: string;
    /** Whether cloze matching is case sensitive */
    caseSensitive?: boolean;
    /** Background color for inline components */
    bgColor?: string;
    /** Schema hint for object types (for AI agents) */
    schema?: string;
}

export const variableDefinitions: Record<string, VariableDefinition> = {
    // ─────────────────────────────────────────
    // MAIN INTERACTIVE VALUE: n (number of odd numbers to sum)
    // ─────────────────────────────────────────
    numberOfOdds: {
        defaultValue: 4,
        type: 'number',
        label: 'Number of odd numbers (n)',
        description: 'How many consecutive odd numbers to add, starting from 1',
        min: 1,
        max: 10,
        step: 1,
        color: '#62D0AD', // Soft teal
    },

    // ─────────────────────────────────────────
    // DERIVED VALUES (readonly display)
    // ─────────────────────────────────────────
    currentSum: {
        defaultValue: 16,
        type: 'number',
        label: 'Current sum',
        description: 'The sum of the first n odd numbers (computed)',
        color: '#8E90F5', // Soft indigo
    },

    squareRoot: {
        defaultValue: 4,
        type: 'number',
        label: 'Square root',
        description: 'The square root of the current sum',
        color: '#F7B23B', // Warm amber
    },

    // ─────────────────────────────────────────
    // GNOMON VISUALIZATION STEP
    // ─────────────────────────────────────────
    gnomonStep: {
        defaultValue: 1,
        type: 'number',
        label: 'Gnomon step',
        description: 'Which L-shaped layer to highlight in the gnomon visualization',
        min: 1,
        max: 10,
        step: 1,
        color: '#AC8BF9', // Soft violet
    },

    // ─────────────────────────────────────────
    // LINKED HIGHLIGHT GROUP
    // ─────────────────────────────────────────
    squareHighlight: {
        defaultValue: '',
        type: 'linkedHighlight',
        label: 'Square highlight group',
        description: 'For linking prose to visualization elements',
        color: '#F8A0CD', // Soft rose
    },

    // ─────────────────────────────────────────
    // ASSESSMENT QUESTIONS
    // ─────────────────────────────────────────
    answerSumFiveOdds: {
        defaultValue: '',
        type: 'text',
        label: 'Answer: Sum of first 5 odds',
        description: 'Student answer for 1+3+5+7+9',
        placeholder: '???',
        correctAnswer: '25',
        color: '#62D0AD',
    },

    answerSumSixOdds: {
        defaultValue: '',
        type: 'text',
        label: 'Answer: Sum of first 6 odds',
        description: 'Student answer for 1+3+5+7+9+11',
        placeholder: '???',
        correctAnswer: '36',
        color: '#8E90F5',
    },

    answerWhySquare: {
        defaultValue: '',
        type: 'select',
        label: 'Answer: Why perfect square',
        description: 'Student answer for why the sum is always a perfect square',
        placeholder: '???',
        correctAnswer: 'Each odd number adds an L-shaped border to the square',
        options: [
            'It is a coincidence',
            'Odd numbers are special',
            'Each odd number adds an L-shaped border to the square',
            'The formula requires it'
        ],
        color: '#F7B23B',
    },

    answerNinthOdd: {
        defaultValue: '',
        type: 'text',
        label: 'Answer: 9th odd number',
        description: 'Student answer for what the 9th odd number is',
        placeholder: '???',
        correctAnswer: '17',
        color: '#AC8BF9',
    },
};

/**
 * Get all variable names (for AI agents to discover)
 */
export const getVariableNames = (): string[] => {
    return Object.keys(variableDefinitions);
};

/**
 * Get a variable's default value
 */
export const getDefaultValue = (name: string): VarValue => {
    return variableDefinitions[name]?.defaultValue ?? 0;
};

/**
 * Get a variable's metadata
 */
export const getVariableInfo = (name: string): VariableDefinition | undefined => {
    return variableDefinitions[name];
};

/**
 * Get all default values as a record (for initialization)
 */
export const getDefaultValues = (): Record<string, VarValue> => {
    const defaults: Record<string, VarValue> = {};
    for (const [name, def] of Object.entries(variableDefinitions)) {
        defaults[name] = def.defaultValue;
    }
    return defaults;
};

/**
 * Get number props for InlineScrubbleNumber from a variable definition.
 */
export function numberPropsFromDefinition(def: VariableDefinition | undefined): {
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    color?: string;
} {
    if (!def || def.type !== 'number') return {};
    return {
        defaultValue: def.defaultValue as number,
        min: def.min,
        max: def.max,
        step: def.step,
        ...(def.color ? { color: def.color } : {}),
    };
}

/**
 * Get cloze choice props for InlineClozeChoice from a variable definition.
 */
export function choicePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Get toggle props for InlineToggle from a variable definition.
 */
export function togglePropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

export function clozePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
    caseSensitive?: boolean;
} {
    if (!def || def.type !== 'text') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
        ...(def.caseSensitive !== undefined ? { caseSensitive: def.caseSensitive } : {}),
    };
}

/**
 * Get spot-color props for InlineSpotColor from a variable definition.
 */
export function spotColorPropsFromDefinition(def: VariableDefinition | undefined): {
    color: string;
} {
    return {
        color: def?.color ?? '#8B5CF6',
    };
}

/**
 * Get linked-highlight props for InlineLinkedHighlight from a variable definition.
 */
export function linkedHighlightPropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    return {
        ...(def?.color ? { color: def.color } : {}),
        ...(def?.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Build the `variables` prop for FormulaBlock from variable definitions.
 */
export function scrubVarsFromDefinitions(
    varNames: string[],
): Record<string, { min?: number; max?: number; step?: number; color?: string }> {
    const result: Record<string, { min?: number; max?: number; step?: number; color?: string }> = {};
    for (const name of varNames) {
        const def = variableDefinitions[name];
        if (!def) continue;
        result[name] = {
            ...(def.min !== undefined ? { min: def.min } : {}),
            ...(def.max !== undefined ? { max: def.max } : {}),
            ...(def.step !== undefined ? { step: def.step } : {}),
            ...(def.color ? { color: def.color } : {}),
        };
    }
    return result;
}
