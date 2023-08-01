import Memory from "./metrics/memory";
import Cpu from "./metrics/cpu";
import Sensor from "./metrics/sensor";
import Net from "./metrics/net";
import Process from "./metrics/process";
import Disk from "./metrics/disk";

export default function Component({ service }) {
  const { widget } = service;

  if (widget.metric === "memory") {
    return <Memory service={service} />;
  }

  if (widget.metric === "process") {
    return <Process service={service} />;
  }

  if (widget.metric.match(/^network:/)) {
    return <Net service={service} />;
  }

  if (widget.metric.match(/^sensor:/)) {
    return <Sensor service={service} />;
  }

  if (widget.metric.match(/^disk:/)) {
    return <Disk service={service} />;
  }

  if (widget.metric === "cpu") {
    return <Cpu service={service} />;
  }
}