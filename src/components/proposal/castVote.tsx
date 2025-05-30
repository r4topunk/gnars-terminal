'use client';

import { Proposal } from '@/app/services/proposal';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  useReadGovernorGetVotes,
  useWriteGovernorCastVote,
  useWriteGovernorCastVoteWithReason,
} from '@/hooks/wagmiGenerated';
import {
  ButtonProps,
  Link as ChakraLink,
  HStack,
  Text,
  Textarea,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { LuExternalLink } from 'react-icons/lu';
import { Address, zeroAddress } from 'viem';
import { useAccount } from 'wagmi';
import { Button } from '../ui/button';
import { Field } from '../ui/field';
import { RadioCardItem, RadioCardRoot } from '../ui/radio-card';
import { getProposalStatus, Status } from './status';

interface CastVoteProps {
  proposal: Proposal;
  setProposal: Dispatch<SetStateAction<Proposal>>;
}

type Vote = 'For' | 'Against' | 'Abstain';

const voteMap = {
  FOR: {
    label: 'For',
    color: 'green.500',
  },
  AGAINST: {
    label: 'Against',
    color: 'red.500',
  },
  ABSTAIN: {
    label: 'Abstain',
    color: 'yellow.500',
  },
};

interface CountdownRendererProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownRenderer = ({
  hours,
  minutes,
  seconds,
}: CountdownRendererProps) => (
  <Text display={'inline-block'}>
    {hours >= 0 && `${zeroPad(hours)}h `}
    {minutes >= 0 && `${zeroPad(minutes)}m `}
    {zeroPad(seconds)}s
  </Text>
);

interface VoteButtonProps extends ButtonProps {
  voteStarted: boolean;
  voteEnded: boolean;
  voteStart: number;
  userVotes: bigint;
}

const VoteButton = forwardRef<HTMLButtonElement, VoteButtonProps>(
  function VoteButton(props, ref) {
    return (
      <Button
        size={'xl'}
        w={'full'}
        variant={props.voteStart ? 'surface' : 'solid'}
        disabled={
          !props.voteStarted || props.voteEnded || props.userVotes === 0n
        }
        {...props}
        ref={ref}
      >
        {props.voteStarted ? (
          'Submit Votes'
        ) : (
          <Text>
            Time until voting starts:{' '}
            <Countdown renderer={CountdownRenderer} date={props.voteStart} />
          </Text>
        )}
      </Button>
    );
  }
);

interface VoteBodyProps {
  disableFields: boolean;
  setVote: (vote: Vote) => void;
  setReason: (reason: string) => void;
}

const VoteBody = forwardRef<HTMLDivElement, VoteBodyProps>(
  function VoteBody(props, ref) {
    return (
      <VStack gap={4} align='stretch'>
        <RadioCardRoot disabled={props.disableFields}>
          <HStack align='stretch'>
            <RadioCardItem
              value={'For'}
              label={'For'}
              colorPalette={'green'}
              onChange={() => props.setVote('For')}
            />
            <RadioCardItem
              value={'Against'}
              label={'Against'}
              colorPalette={'red'}
              onChange={() => props.setVote('Against')}
            />
            <RadioCardItem
              value={'Abstain'}
              label={'Abstain'}
              colorPalette={'gray'}
              onChange={() => props.setVote('Abstain')}
            />
          </HStack>
        </RadioCardRoot>
        <Field label='Reason'>
          <Textarea
            placeholder='Enter your reason here'
            onChange={(event) => props.setReason(event.target.value)}
            disabled={props.disableFields}
            size={'lg'}
          />
        </Field>
      </VStack>
    );
  }
);

interface VoteFooterProps {
  loading: boolean;
  disableFields: boolean;
  onClickVote: () => void;
  txHash: string | null;
  voteEmpty: boolean;
}

const VoteFooter: React.FC<VoteFooterProps> = (props) => {
  return (
    <VStack w={'full'}>
      <Button
        loading={props.loading}
        disabled={props.disableFields || props.voteEmpty}
        onClick={props.onClickVote}
        w={'full'}
      >
        {props.disableFields ? 'Submitted' : 'Submit'}
      </Button>
      {props.txHash && (
        <ChakraLink asChild>
          <NextLink href={`https://basescan.org/tx/${props.txHash}`}>
            Transaction: {props.txHash.slice(0, 4)}...{props.txHash.slice(-4)}
            <LuExternalLink />
          </NextLink>
        </ChakraLink>
      )}
    </VStack>
  );
};

export default function CastVote({ proposal, setProposal }: CastVoteProps) {
  const account = useAccount();
  const userAddress = account.address
    ? account.address.toLocaleLowerCase()
    : zeroAddress;

  const [vote, setVote] = useState<Vote | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [reason, setReason] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { data: userVotes } = useReadGovernorGetVotes({
    args: [userAddress as Address, BigInt(proposal.timeCreated)],
  });

  const [isLargerThanMd] = useMediaQuery(['(min-width: 768px)'], {
    fallback: [true],
  });

  const voteValue = useMemo(
    () => (vote === 'For' ? 1n : vote === 'Against' ? 0n : 2n),
    [vote]
  );
  const disableFields = useMemo(
    () => txHash !== null || loading,
    [txHash, loading]
  );
  const voteStarted = useMemo(
    () => new Date().getTime() > parseInt(proposal.voteStart) * 1000,
    [proposal.voteStart]
  );
  const voteEnded = useMemo(
    () => new Date().getTime() > parseInt(proposal.voteEnd) * 1000,
    [proposal.voteEnd]
  );

  const userVote = useMemo(
    () =>
      proposal.votes.find(
        (vote) => vote.voter.toLocaleLowerCase() === userAddress
      ),
    [proposal.votes, userAddress]
  );

  const { writeContractAsync: writeCastVote } = useWriteGovernorCastVote();
  const { writeContractAsync: writeCastVoteReason } =
    useWriteGovernorCastVoteWithReason();

  const onClickVote = useCallback(async () => {
    setLoading(true);
    try {
      let receipt: string | null = null;
      if (reason && reason !== '') {
        receipt = await writeCastVoteReason({
          args: [proposal.proposalId, voteValue, reason],
        });
        setTxHash(receipt);
      } else {
        receipt = await writeCastVote({
          args: [proposal.proposalId, voteValue],
        });
        setTxHash(receipt);
      }
      if (receipt) {
        setProposal((prevProposal) => {
          const voteCount = parseInt(userVotes?.toString() || '0');
          const voteKey =
            vote === 'For'
              ? 'forVotes'
              : vote === 'Against'
                ? 'againstVotes'
                : 'abstainVotes';
          return {
            ...prevProposal,
            [voteKey]: prevProposal[voteKey] + voteCount,
            votes: [
              ...prevProposal.votes,
              {
                voter: userAddress as Address,
                weight: userVotes?.toString() || '0',
                support:
                  vote === 'For'
                    ? 'FOR'
                    : vote === 'Against'
                      ? 'AGAINST'
                      : 'ABSTAIN',
                reason,
              },
            ],
          };
        });
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        window.alert(`Error creating bid: ${error.message}`);
      } else {
        window.alert('Error creating bid');
      }
    } finally {
      setLoading(false);
    }
  }, [
    writeCastVote,
    vote,
    reason,
    proposal.proposalId,
    voteValue,
    writeCastVoteReason,
    setProposal,
    userAddress,
  ]);

  if (
    [Status.EXPIRED, Status.CANCELLED].includes(getProposalStatus(proposal)) ||
    account.isDisconnected
  ) {
    return null;
  }

  if (userVote) {
    return (
      <Text w={'full'} textAlign={'center'} mt={3} fontWeight={'medium'}>
        You voted{' '}
        <Text asChild color={voteMap[userVote.support].color}>
          <span>{voteMap[userVote.support].label}</span>
        </Text>{' '}
        with {userVote.weight} votes
      </Text>
    );
  }

  if (!userVote && voteEnded) {
    return (
      <Text w={'full'} textAlign={'center'} mt={3} fontWeight={'medium'}>
        You did not voted on this proposal
      </Text>
    );
  }

  if (isLargerThanMd) {
    return (
      <DialogRoot placement={'center'} motionPreset='slide-in-bottom'>
        <DialogTrigger asChild>
          <VoteButton
            voteStarted={voteStarted}
            voteEnded={voteEnded}
            voteStart={parseInt(proposal.voteStart) * 1000}
            userVotes={userVotes || 0n}
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader pb={2}>
            <DialogTitle>Submit Votes</DialogTitle>
            <DialogDescription>
              You are voting with {userVotes?.toString()} votes
            </DialogDescription>
          </DialogHeader>
          <DialogBody pb={2}>
            <VoteBody
              disableFields={disableFields}
              setVote={setVote}
              setReason={setReason}
            />
          </DialogBody>
          <DialogFooter>
            <VoteFooter
              loading={loading}
              disableFields={disableFields}
              onClickVote={onClickVote}
              txHash={txHash}
              voteEmpty={vote === null}
            />
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    );
  }

  return (
    <DrawerRoot placement={'bottom'}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <VoteButton
          voteStarted={voteStarted}
          voteEnded={voteEnded}
          voteStart={parseInt(proposal.voteStart) * 1000}
          userVotes={userVotes || 0n}
        />
      </DrawerTrigger>
      <DrawerContent roundedTop={'md'}>
        <DrawerHeader>
          <DrawerTitle>Submit Votes</DrawerTitle>
          <DrawerDescription>
            You are voting with {userVotes?.toString()} votes
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <VoteBody
            disableFields={disableFields}
            setVote={setVote}
            setReason={setReason}
          />
        </DrawerBody>
        <DrawerFooter>
          <VoteFooter
            loading={loading}
            disableFields={disableFields}
            onClickVote={onClickVote}
            txHash={txHash}
            voteEmpty={vote === null}
          />
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
}
