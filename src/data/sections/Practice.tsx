/**
 * Section 4: Practice Questions
 * Assessment questions to solidify understanding.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineClozeInput,
    InlineClozeChoice,
    InlineFeedback,
} from "@/components/atoms";
import { getVariableInfo, clozePropsFromDefinition, choicePropsFromDefinition } from "../variables";

export const practiceBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-practice-heading" maxWidth="xl">
        <Block id="practice-heading" padding="md">
            <EditableH2 id="h2-practice-heading" blockId="practice-heading">
                Practice
            </EditableH2>
        </Block>
    </StackLayout>,

    // Intro
    <StackLayout key="layout-practice-intro" maxWidth="xl">
        <Block id="practice-intro" padding="sm">
            <EditableParagraph id="para-practice-intro" blockId="practice-intro">
                Let's test your understanding of the pattern. Try answering these questions without looking back at the visualization.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 1: Sum of first 5 odd numbers
    <StackLayout key="layout-practice-question-one" maxWidth="xl">
        <Block id="practice-question-one" padding="sm">
            <EditableParagraph id="para-practice-question-one" blockId="practice-question-one">
                <strong>Question 1:</strong> The sum of the first 5 odd numbers (1 + 3 + 5 + 7 + 9) equals{" "}
                <InlineFeedback
                    varName="answerSumFiveOdds"
                    correctValue="25"
                    position="terminal"
                    successMessage="— exactly right! Since there are 5 odd numbers, the sum is 5² = 25"
                    failureMessage="— not quite"
                    hint="Remember: the sum of the first n odd numbers equals n². Here n = 5"
                >
                    <InlineClozeInput
                        varName="answerSumFiveOdds"
                        correctAnswer="25"
                        {...clozePropsFromDefinition(getVariableInfo('answerSumFiveOdds'))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 2: Sum of first 6 odd numbers
    <StackLayout key="layout-practice-question-two" maxWidth="xl">
        <Block id="practice-question-two" padding="sm">
            <EditableParagraph id="para-practice-question-two" blockId="practice-question-two">
                <strong>Question 2:</strong> If we add one more odd number to the previous sum, the first 6 odd numbers (1 + 3 + 5 + 7 + 9 + 11) sum to{" "}
                <InlineFeedback
                    varName="answerSumSixOdds"
                    correctValue="36"
                    position="terminal"
                    successMessage="— well done! With 6 odd numbers, the sum is 6² = 36"
                    failureMessage="— try again"
                    hint="The sum of n odd numbers is n². Here n = 6"
                >
                    <InlineClozeInput
                        varName="answerSumSixOdds"
                        correctAnswer="36"
                        {...clozePropsFromDefinition(getVariableInfo('answerSumSixOdds'))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 3: Why is it always a perfect square?
    <StackLayout key="layout-practice-question-three" maxWidth="xl">
        <Block id="practice-question-three" padding="sm">
            <EditableParagraph id="para-practice-question-three" blockId="practice-question-three">
                <strong>Question 3:</strong> Why is the sum of the first n odd numbers always a perfect square?{" "}
                <InlineFeedback
                    varName="answerWhySquare"
                    correctValue="Each odd number adds an L-shaped border to the square"
                    position="standalone"
                    successMessage="Exactly! Each odd number (2n−1) represents the cells in an L-shaped gnomon that wraps around the previous square, building up an n×n grid"
                    failureMessage="Think about the visual proof"
                    hint="Remember the gnomon visualization: what does each odd number represent geometrically?"
                >
                    <InlineClozeChoice
                        varName="answerWhySquare"
                        correctAnswer="Each odd number adds an L-shaped border to the square"
                        options={[
                            'It is a coincidence',
                            'Odd numbers are special',
                            'Each odd number adds an L-shaped border to the square',
                            'The formula requires it'
                        ]}
                        {...choicePropsFromDefinition(getVariableInfo('answerWhySquare'))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Question 4: What is the 9th odd number?
    <StackLayout key="layout-practice-question-four" maxWidth="xl">
        <Block id="practice-question-four" padding="sm">
            <EditableParagraph id="para-practice-question-four" blockId="practice-question-four">
                <strong>Question 4:</strong> The 9th odd number is{" "}
                <InlineFeedback
                    varName="answerNinthOdd"
                    correctValue="17"
                    position="terminal"
                    successMessage="— correct! The nth odd number is 2n − 1, so the 9th is 2(9) − 1 = 17"
                    failureMessage="— not quite"
                    hint="The nth odd number is 2n − 1. What is 2(9) − 1?"
                >
                    <InlineClozeInput
                        varName="answerNinthOdd"
                        correctAnswer="17"
                        {...clozePropsFromDefinition(getVariableInfo('answerNinthOdd'))}
                    />
                </InlineFeedback>
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Wrap-up
    <StackLayout key="layout-practice-wrapup" maxWidth="xl">
        <Block id="practice-wrapup" padding="sm">
            <EditableParagraph id="para-practice-wrapup" blockId="practice-wrapup">
                The relationship between odd numbers and perfect squares has been known since ancient times. The Greek mathematician Pythagoras and his followers studied this pattern over 2,500 years ago. Now you have discovered the same beautiful truth for yourself!
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
