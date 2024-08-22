import { Response } from "express";
import moment from "moment";
import { ExtendedRequest } from "../interfaces/extendedRequest";
import createSession from "../models/proposeSession/proposeSession";

export interface ProposeSlots {
  timezone: string;
  startTime: string[];
}

export async function propose(req: ExtendedRequest, res: Response) {
  const { timezone, startTime } = req.body as ProposeSlots;

  const findingQueries = startTime.map((el) => {
    return createSession.findOne({
      user: req.user?._id,
      startTime: {
        $gt: moment(el).subtract(90, "minutes").toISOString(),
        $lt: moment(el).add(90, "minutes").toISOString(),
      },
    });
  });

  const foundRes = await Promise.all(findingQueries);
  if (foundRes.some((el) => !!el)) {
    return res
      .status(409)
      .send({ error: "409", message: "A session already exists" });
  }

  // if (sessionConflict) {
  // }
  console.log(startTime, moment(startTime).toISOString());
  console.log(req.user);

  try {
    const newSession = await createSession.create({
      timezone,
      startTime,
      user: req.user?._id,
    });

    return res
      .status(201)
      .send({ message: "Session created successfully", session: newSession });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error: "500", message: "Internal server error" });
  }
}
export async function getAllProposedSession(
  req: ExtendedRequest,
  res: Response
) {
  try {
    const getAllSessions = await createSession.find({
      user: req.user?._id,
      startTime: { $gt: moment().toISOString() },
    });
    return res.status(201).send(getAllSessions);
  } catch (error) {
    console.log(error);
  }
}

export async function getSessionByDate(req: ExtendedRequest, res: Response) {
  const { date } = req.body;
  try {
    const getSessionByDate = await createSession.find({
      user: req.user?._id,
      date: date,
    });
    return res.status(201).send(getSessionByDate);
  } catch (error) {
    console.log(error);
  }
}
