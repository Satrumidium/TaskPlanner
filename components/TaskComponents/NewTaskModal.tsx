import {
  Button,
  InputWrapper,
  Modal,
  Space,
  Textarea,
  TextInput,
} from "@mantine/core";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { DatePicker, TimeInput } from "@mantine/dates";

// import logger from "../../utils/logger";
import { TaskFormObj, TaskObj } from "../../utils/types";

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  tasks: TaskObj[];
  setTasks: Dispatch<SetStateAction<TaskObj[]>>;
}

const NewTimerModal = ({
  opened,
  setOpened,
  tasks,
  setTasks,
}: Props): JSX.Element => {
  const [timeValue, setTimeValue] = useState(new Date());
  const [taskError, setTaskError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (!opened) {
      setTaskError("");
      setDescriptionError("");
      setTimeError("");
      setDateError("");
    }
  }, [opened]);

  function submitForm(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const data: TaskFormObj = {
      name: e.currentTarget.task.value,
      description: e.currentTarget.description.value,
      startTime: e.currentTarget.time.value,
      date: timeValue,
    };

    // Data validation
    // Time and date are validated with HTML
    if (data.name.length > 128) {
      setTaskError("Task Name is over 128 characters long.");
      return;
    }
    if (data.description) {
      if (data.description.length > 512) {
        setTaskError("Description is over 512 characters long.");
      }
    }

    const tempTask: TaskObj = {
      id: Math.floor(new Date().getTime() * Math.random()).toString(),
      name: data.name,
      date: data.date,
      startTime: data.startTime,
      done: false,
    };

    const tempTasks = [...tasks, tempTask];
    setTasks(tempTasks);
    setOpened(false);
  }

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title="Create A New Task"
      transition="rotate-right"
      transitionDuration={350}
      transitionTimingFunction="ease"
      overlayOpacity={0.55}
    >
      <form onSubmit={submitForm}>
        <InputWrapper>
          <TextInput
            label="Task Name"
            id="task"
            placeholder="Your task name"
            required
            error={taskError}
          />
          <Textarea
            description="optional"
            label="Description"
            id="description"
            placeholder="Your description"
            autosize
            minRows={2}
            maxRows={4}
            error={descriptionError}
          />
          <TimeInput
            label="Pick Time"
            placeholder="Pick time"
            // icon={<Clock size={16} />}
            defaultValue={new Date()}
            id="time"
            clearable
            hoursLabel="Hours"
            minutesLabel="Minutes"
            description="optional"
            error={timeError}
            value={timeValue}
            onChange={setTimeValue}
          />
          <DatePicker
            placeholder="Pick date"
            label="Event Date"
            id="date"
            defaultValue={new Date()}
            description="optional"
            error={dateError}
          />
          <Space h="md" />
          <Button sx={{ float: "right" }} type="submit">
            Create Task
          </Button>
        </InputWrapper>
      </form>
    </Modal>
  );
};

export default NewTimerModal;
