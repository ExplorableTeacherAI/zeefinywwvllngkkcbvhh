import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Import sections
import { introductionBlocks } from "./sections/Introduction";

/**
 * Sum of Consecutive Odd Numbers - Explorable Explanation
 *
 * This lesson explores the beautiful pattern that the sum of the first n
 * consecutive odd numbers always equals n².
 */
export const blocks: ReactElement[] = [
    ...introductionBlocks,
];
