"use client";

import { Table } from "flowbite-react";
import StringSkeleteton from "../StringSkeleton/StringSkeleton";

export default function TableSketon({ lines = 3 }: { lines?: number }) {
    const cols = Array(5)
        .fill(0)
        .map((_, i) => ({ key: i, label: i }));
    const rows = Array(lines)
        .fill(0)
        .map((_, i) => ({ key: i }));

    return (
        <Table>
            <Table.Head>
                {cols.map((v) => (
                    <Table.Cell key={v.key}></Table.Cell>
                ))}
            </Table.Head>
            <Table.Body>
                {rows.map((item) => (
                    <Table.Row key={item.key}>
                        <Table.Cell>
                            <StringSkeleteton className="w-[500px]" />
                        </Table.Cell>
                        <Table.Cell>
                            <StringSkeleteton
                                from={100}
                                to={100}
                                className="w-[100px]"
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <StringSkeleteton
                                from={100}
                                to={100}
                                className="w-[100px]"
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <StringSkeleteton
                                from={100}
                                to={100}
                                className="w-[100px]"
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <StringSkeleteton
                                from={100}
                                to={100}
                                className="w-[100px]"
                            />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}