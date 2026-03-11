/**
 * Section 2: Building the Pattern
 * Interactive exploration with a reactive table showing the pattern.
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    Table,
} from "@/components/atoms";
import { useVar } from "@/stores";
import { getVariableInfo, numberPropsFromDefinition } from "../variables";

/**
 * Reactive table showing odd numbers, running sums, and perfect squares.
 */
function PatternTable() {
    const n = useVar('numberOfOdds', 4) as number;

    // Build table rows dynamically
    const rows = [];
    let runningSum = 0;

    for (let i = 1; i <= n; i++) {
        const oddNumber = 2 * i - 1;
        runningSum += oddNumber;
        const perfectSquare = i * i;

        rows.push({
            cells: [
                <span key={`n-${i}`} style={{ fontWeight: 500 }}>{i}</span>,
                <span key={`odd-${i}`} style={{ color: '#62D0AD', fontWeight: 600 }}>{oddNumber}</span>,
                <span key={`sum-${i}`} style={{ color: '#8E90F5', fontWeight: 600 }}>{runningSum}</span>,
                <span key={`sq-${i}`} style={{ color: '#F7B23B', fontWeight: 600 }}>{perfectSquare}</span>,
            ],
            highlight: i === n,
            highlightColor: '#62D0AD',
        });
    }

    return (
        <Table
            columns={[
                { header: 'n', align: 'center', width: 60 },
                { header: 'nth odd number', align: 'center', width: 140 },
                { header: 'Running sum', align: 'center', width: 140 },
                { header: 'n²', align: 'center', width: 80 },
            ]}
            rows={rows}
            color="#62D0AD"
            striped={false}
            bordered={true}
        />
    );
}

/**
 * Reactive formula display showing the current sum.
 */
function ReactiveFormulaText() {
    const n = useVar('numberOfOdds', 4) as number;
    const odds = Array.from({ length: n }, (_, i) => 2 * i + 1);
    const sum = n * n;

    return (
        <span>
            <span style={{ color: '#62D0AD' }}>{odds.join(' + ')}</span>
            {' = '}
            <span style={{ color: '#8E90F5', fontWeight: 600 }}>{sum}</span>
            {' = '}
            <span style={{ color: '#F7B23B', fontWeight: 600 }}>{n}²</span>
        </span>
    );
}

export const buildingThePatternBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-pattern-heading" maxWidth="xl">
        <Block id="pattern-heading" padding="md">
            <EditableH2 id="h2-pattern-heading" blockId="pattern-heading">
                Building the Pattern
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction to pattern exploration
    <StackLayout key="layout-pattern-intro" maxWidth="xl">
        <Block id="pattern-intro" padding="sm">
            <EditableParagraph id="para-pattern-intro" blockId="pattern-intro">
                Let's build up the pattern step by step. The table below shows the first{" "}
                <InlineScrubbleNumber
                    varName="numberOfOdds"
                    {...numberPropsFromDefinition(getVariableInfo('numberOfOdds'))}
                />
                {" "}odd numbers, their running sum, and the corresponding perfect square. Notice how the running sum column always matches the n² column exactly.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive table
    <StackLayout key="layout-pattern-table" maxWidth="xl">
        <Block id="pattern-table" padding="sm">
            <PatternTable />
        </Block>
    </StackLayout>,

    // Observation paragraph
    <StackLayout key="layout-pattern-observation" maxWidth="xl">
        <Block id="pattern-observation" padding="sm">
            <EditableParagraph id="para-pattern-observation" blockId="pattern-observation">
                Look at the rightmost two columns. No matter how many odd numbers you add, the sum is always a perfect square. Right now: <ReactiveFormulaText />. This is not a coincidence — there is a beautiful geometric reason hiding behind these numbers.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Key insight paragraph
    <StackLayout key="layout-pattern-insight" maxWidth="xl">
        <Block id="pattern-insight" padding="sm">
            <EditableParagraph id="para-pattern-insight" blockId="pattern-insight">
                Each odd number you add corresponds to adding one more "layer" to a growing square. The first odd number, 1, is a single dot — a 1×1 square. Add 3 more dots arranged in an L-shape around it, and you get a 2×2 square. Add 5 more in the next L-shape, and you have a 3×3 square. This L-shaped pattern is called a <strong>gnomon</strong>, and it is the key to understanding why this works.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
