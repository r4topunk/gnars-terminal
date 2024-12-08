import { Card, Stack, Text, Box, Flex, Badge } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { FormattedAddress } from "../utils/ethereum";

interface Vote {
    voter: string;
    support: string; // e.g., "FOR", "AGAINST", "ABSTAIN"
    weight: string;
    reason: string;
}

interface ProposalVotesContentProps {
    proposal: {
        votes: Vote[];
    };
}
;
export default function ProposalVotesContent({ proposal }: ProposalVotesContentProps) {

    return (
        <Stack gap={4} w="full">
            {proposal.votes.map((vote, index) => (
                <Card.Root key={index} size="md" borderRadius="lg" variant="outline">
                    {/* Header Section with Voter Information */}
                    <Card.Header>
                        <Flex justify="space-between" align="center" w="full">
                            {/* Voter Avatar and Address */}
                            <Box display="flex" alignItems="center" gap={4}>
                                <Avatar
                                    size="md"
                                    name={vote.voter}
                                    src={`https://api.dicebear.com/5.x/identicon/svg?seed=${vote.voter}`} // Example avatar
                                />
                                <FormattedAddress address={vote.voter} />
                            </Box>

                            {/* Support Badge */}
                            <Badge
                                variant="solid"
                                backgroundColor={
                                    vote.support === "FOR"
                                        ? "green.400"
                                        : vote.support === "AGAINST"
                                            ? "red.400"
                                            : vote.support === "ABSTAIN"
                                                ? "yellow.200"
                                                : "gray"
                                }
                            >
                                {vote.support}
                            </Badge>
                        </Flex>
                    </Card.Header>

                    {/* Body Section with Voting Details */}
                    <Card.Body>
                        <Stack gap={3}>
                            <Text>
                                <strong>Weight:</strong> {vote.weight} votes
                            </Text>
                            {vote.reason && (
                                <Box bg="gray.100" _dark={{ bg: "gray.700" }} p={3} borderRadius="md">
                                    <Text>{vote.reason}</Text>
                                </Box>
                            )}
                        </Stack>
                    </Card.Body>
                </Card.Root>
            ))}
        </Stack>
    );
}
