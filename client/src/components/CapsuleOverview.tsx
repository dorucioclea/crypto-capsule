import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { openCapsule } from "../services/contracthelper";
import { selectAddress } from "../state/userSlice";
import CapsuleType from "../types/CapsuleType";

import capsuleOpen from "../assets/capsule-open-large.png";
import capsuleLocked from "../assets/capsule-locked-large.png";
import capsuleReady from "../assets/capsule-ready-large.png";

import Button from "./Button";
import { getCapsuleUsdValue } from "../services/oracleService";
import Countdown from "./Countdown";
import BlockContent from "./BlockContent";
import { getCanBeOpened } from "../services/dateHelper";

const CapsuleImage = styled.img`
  width: 40rem;
  margin-bottom: 2rem;
`;

const Usd = styled.div`
  font-size: 8rem;
  margin-bottom: 2rem;
  transform: rotate(-3deg);
  color: var(--main);
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 6rem;
  background-color: var(--primary);
`;

type Props = {
  capsule: CapsuleType;
  update: () => void;
};

const CapsuleOverview = (props: Props): JSX.Element => {
  const address = useSelector(selectAddress);

  const [usd, setUsd] = useState<string>("");

  const canBeOpened = getCanBeOpened(props.capsule);

  const open = async () => {
    await openCapsule(props.capsule.id);
    props.update();
  };

  const getUsd = async (_capsule: CapsuleType) => {
    const usdValue = await getCapsuleUsdValue(_capsule);
    setUsd(`$${Number(usdValue).toFixed(0).toLocaleString()}`);
  };

  useEffect(() => {
    getUsd(props.capsule);
  }, [props.capsule]);

  return (
    <BlockContent
      content={
        <>
          {usd && usd !== "$0" && <Usd>{usd}</Usd>}
          <CapsuleImage
            src={
              props.capsule.empty
                ? capsuleOpen
                : !canBeOpened
                ? capsuleLocked
                : capsuleReady
            }
          />
          {!canBeOpened && <Countdown capsule={props.capsule} />}
          {false && <ProgressContainer>meow</ProgressContainer>}
          {props.capsule.beneficiary === address &&
            canBeOpened &&
            !props.capsule.empty && (
              <Button primary text="Open" click={() => open()} />
            )}
        </>
      }
    />
  );
};

export default CapsuleOverview;
