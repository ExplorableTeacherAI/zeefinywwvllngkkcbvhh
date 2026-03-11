/**
 * Section 1: Introduction
 * A surprising hook about the sum of consecutive odd numbers.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import {
    EditableH1,
    EditableParagraph,
    InlineScrubbleNumber,
} from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";
import { getVariableInfo, numberPropsFromDefinition } from "../variables";
import { useEffect } from "react";

/**
 * Reactive component that keeps the derived values in sync.
 */
function SyncDerivedValues() {
    const n = useVar('numberOfOdds', 4) as number;
    const setVar = useSetVar();

    useEffect(() => {
        // Sum of first n odd numbers = n²
        const sum = n * n;
        setVar('currentSum', sum);
        setVar('squareRoot', n);
    }, [n, setVar]);

    return null;
}

/**
 * Reactive text that shows the current sum.
 */
function ReactiveSum() {
    const n = useVar('numberOfOdds', 4) as number;
    const sum = n * n;
    return <span style={{ color: '#8E90F5', fontWeight: 600 }}>{sum}</span>;
}

/**
 * Reactive text that shows the odd numbers being added.
 */
function ReactiveOddSequence() {
    const n = useVar('numberOfOdds', 4) as number;
    const odds = Array.from({ length: n }, (_, i) => 2 * i + 1);
    return <span style={{ color: '#62D0AD' }}>{odds.join(' + ')}</span>;
}

export const introductionBlocks: ReactElement[] = [
    // Hidden sync component
    <StackLayout key="layout-intro-sync" maxWidth="xl">
        <SyncDerivedValues />
    </StackLayout>,

    // Title
    <StackLayout key="layout-intro-title" maxWidth="xl">
        <Block id="intro-title" padding="md">
            <EditableH1 id="h1-intro-title" blockId="intro-title">
                The Sum of Consecutive Odd Numbers
            </EditableH1>
        </Block>
    </StackLayout>,

    // Hook paragraph with surprising claim
    <StackLayout key="layout-intro-hook" maxWidth="xl">
        <Block id="intro-hook" padding="sm">
            <EditableParagraph id="para-intro-hook" blockId="intro-hook">
                Here is something curious: add up the first few odd numbers, and you will always get a <strong>perfect square</strong>. Not just sometimes. Always.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive exploration
    <StackLayout key="layout-intro-exploration" maxWidth="xl">
        <Block id="intro-exploration" padding="sm">
            <EditableParagraph id="para-intro-exploration" blockId="intro-exploration">
                The first{" "}
                <InlineScrubbleNumber
                    varName="numberOfOdds"
                    {...numberPropsFromDefinition(getVariableInfo('numberOfOdds'))}
                />
                {" "}odd numbers are <ReactiveOddSequence />. Their sum is <ReactiveSum />, which happens to be exactly{" "}
                <InlineScrubbleNumber
                    varName="numberOfOdds"
                    {...numberPropsFromDefinition(getVariableInfo('numberOfOdds'))}
                    readonly
                />
                {" "}squared. Coincidence? Try changing the number and see for yourself.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Teaser for the visual proof
    <StackLayout key="layout-intro-teaser" maxWidth="xl">
        <Block id="intro-teaser" padding="sm">
            <EditableParagraph id="para-intro-teaser" blockId="intro-teaser">
                This pattern holds for any count of odd numbers. Add the first 100 odd numbers, and you get 10,000. The first 1,000? Exactly 1,000,000. In the sections below, we will discover <em>why</em> this works, using a beautiful visual proof that has been known since ancient Greece.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
