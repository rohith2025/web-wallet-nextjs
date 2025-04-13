"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const handleSend = async () => {
        try {
            await p2pTransfer(number, Number(amount) * 100);
            // If successful, clear input fields and show success message
            setNumber("");
            setAmount("");
            setStatusMessage("Sent successfully!");
        } catch (error : any) {
            // If error, show error message
            setStatusMessage("Error: " + error.message);
        }
    };

    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-72 pt-2">
                        <TextInput
                            placeholder={"Number"}
                            label="Number"
                            onChange={(value) => setNumber(value)}
                        />
                        <TextInput
                            placeholder={"Amount"}
                            label="Amount"
                            onChange={(value) => setAmount(value)}
                        />
                        <div className="pt-4 flex justify-center">
                            <Button onClick={handleSend}>Send</Button>
                        </div>
                        {statusMessage && (
                            <div className="text-center text-sm text-gray-600 mt-2">
                                {statusMessage}
                            </div>
                        )}
                    </div>
                </Card>
            </Center>
        </div>
    );
}
