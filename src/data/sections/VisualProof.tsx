/**
 * Section 3: The Visual Proof
 * Interactive gnomon (L-shaped layer) visualization showing why sum of odds = n².
 */

import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout, SplitLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableParagraph,
    InlineScrubbleNumber,
    InteractionHintSequence,
} from "@/components/atoms";
import { useVar } from "@/stores";
import { getVariableInfo, numberPropsFromDefinition } from "../variables";

// Color palette for layers (soft, muted colors)
const LAYER_COLORS = [
    '#62D0AD', // teal (1)
    '#8E90F5', // indigo (3)
    '#F7B23B', // amber (5)
    '#AC8BF9', // violet (7)
    '#F8A0CD', // rose (9)
    '#62CCF9', // sky (11)
    '#F4A89A', // coral (13)
    '#A8D5A2', // sage (15)
    '#FFCBA4', // peach (17)
    '#7DD3C0', // mint (19)
];

/**
 * Interactive gnomon square visualization.
 * Each L-shaped layer represents an odd number.
 */
function GnomonVisualization() {
    const n = useVar('numberOfOdds', 4) as number;

    const cellSize = 40;
    const gap = 2;
    const totalSize = n * (cellSize + gap) + gap;

    // Build all cells for an n×n grid
    const cells: ReactElement[] = [];

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            // Determine which layer this cell belongs to (1-indexed)
            // Layer k contains cells where max(row, col) === k - 1
            const layer = Math.max(row, col) + 1;
            const color = LAYER_COLORS[(layer - 1) % LAYER_COLORS.length];

            // Check if this cell is part of the "L" (gnomon) for this layer
            // The gnomon is the rightmost column and bottom row of the layer
            const isGnomon = row === layer - 1 || col === layer - 1;

            cells.push(
                <rect
                    key={`cell-${row}-${col}`}
                    x={gap + col * (cellSize + gap)}
                    y={gap + row * (cellSize + gap)}
                    width={cellSize}
                    height={cellSize}
                    fill={color}
                    rx={4}
                    opacity={isGnomon ? 1 : 0.6}
                    stroke={isGnomon ? '#1e293b' : 'none'}
                    strokeWidth={isGnomon ? 1.5 : 0}
                />
            );
        }
    }

    // Add layer labels on the side
    const labels: ReactElement[] = [];
    for (let layer = 1; layer <= n; layer++) {
        const oddNumber = 2 * layer - 1;
        const color = LAYER_COLORS[(layer - 1) % LAYER_COLORS.length];
        const y = gap + (layer - 1) * (cellSize + gap) + cellSize / 2;

        labels.push(
            <g key={`label-${layer}`}>
                <text
                    x={totalSize + 15}
                    y={y + 5}
                    fontSize={14}
                    fontWeight={600}
                    fill={color}
                    textAnchor="start"
                >
                    +{oddNumber}
                </text>
            </g>
        );
    }

    return (
        <div className="relative flex justify-center">
            <svg
                width={totalSize + 60}
                height={totalSize + 10}
                viewBox={`0 0 ${totalSize + 60} ${totalSize + 10}`}
                className="mx-auto"
            >
                {cells}
                {labels}

                {/* Dimension labels */}
                <text
                    x={totalSize / 2}
                    y={totalSize + 5}
                    fontSize={14}
                    fontWeight={500}
                    fill="#64748b"
                    textAnchor="middle"
                >
                    {n} × {n} = {n * n}
                </text>
            </svg>
            <InteractionHintSequence
                id="gnomon-drag-hint"
                steps={[
                    {
                        gesture: "drag-horizontal",
                        label: "Drag the number above to add layers",
                        position: { x: "50%", y: "10%" },
                    },
                ]}
            />
        </div>
    );
}

/**
 * Reactive text showing current layer info.
 */
function ReactiveLayerInfo() {
    const n = useVar('numberOfOdds', 4) as number;
    const color = LAYER_COLORS[(n - 1) % LAYER_COLORS.length];
    const oddNumber = 2 * n - 1;

    return (
        <span>
            Layer {n} adds{' '}
            <span style={{ color, fontWeight: 600 }}>{oddNumber}</span>
            {' '}cells in an L-shape, completing a{' '}
            <span style={{ color: '#F7B23B', fontWeight: 600 }}>{n}×{n}</span>
            {' '}square with{' '}
            <span style={{ color: '#8E90F5', fontWeight: 600 }}>{n * n}</span>
            {' '}total cells.
        </span>
    );
}

export const visualProofBlocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-visual-heading" maxWidth="xl">
        <Block id="visual-heading" padding="md">
            <EditableH2 id="h2-visual-heading" blockId="visual-heading">
                The Visual Proof: Gnomons
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction to the visual
    <StackLayout key="layout-visual-intro" maxWidth="xl">
        <Block id="visual-intro" padding="sm">
            <EditableParagraph id="para-visual-intro" blockId="visual-intro">
                Here is the beautiful idea: each odd number is exactly the number of cells in an L-shaped "gnomon" that wraps around the previous square. Start with 1 cell. Add 3 cells in an L-shape around it — you get a 2×2 square. Add 5 more cells in the next L-shape — now you have a 3×3 square. The pattern continues forever.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive visualization with split layout
    <SplitLayout key="layout-visual-split" ratio="2:1" gap="lg">
        <Block id="visual-gnomon" padding="sm" hasVisualization>
            <GnomonVisualization />
        </Block>
        <div className="space-y-4">
            <Block id="visual-controls" padding="sm">
                <EditableParagraph id="para-visual-controls" blockId="visual-controls">
                    <strong>Number of layers:</strong>{" "}
                    <InlineScrubbleNumber
                        varName="numberOfOdds"
                        {...numberPropsFromDefinition(getVariableInfo('numberOfOdds'))}
                    />
                </EditableParagraph>
            </Block>
            <Block id="visual-layer-info" padding="sm">
                <EditableParagraph id="para-visual-layer-info" blockId="visual-layer-info">
                    <ReactiveLayerInfo />
                </EditableParagraph>
            </Block>
        </div>
    </SplitLayout>,

    // Explanation of why it works
    <StackLayout key="layout-visual-explanation" maxWidth="xl">
        <Block id="visual-explanation" padding="sm">
            <EditableParagraph id="para-visual-explanation" blockId="visual-explanation">
                Why does each L-shaped layer contain exactly an odd number of cells? Look at layer n: it has n cells along the bottom row and n cells along the right column, but the corner cell is shared. So the total is n + n − 1 = 2n − 1, which is precisely the nth odd number!
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // The formula
    <StackLayout key="layout-visual-formula" maxWidth="xl">
        <Block id="visual-formula" padding="sm">
            <EditableParagraph id="para-visual-formula" blockId="visual-formula">
                This gives us the elegant result: <strong>1 + 3 + 5 + ... + (2n−1) = n²</strong>. The sum of the first n odd numbers equals n squared — not by algebraic coincidence, but because each odd number is literally the count of cells in a layer that builds up a perfect square.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
