"use client";

import type { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { HttpRequestDialog } from "./dialog";


type HttpRequestNodeData = {
  endPoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus = "initial";

  const handleOpenSettings = () => setDialogOpen(true);

  const nodeData = props.data;
  const description = nodeData?.endPoint
    ? `${nodeData.method || "GET"} ${nodeData.endPoint}`
    : "Not configured";

  return (
    <>
      <HttpRequestDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        onSubmit={() => {}}
        defaultEndpoint={nodeData.endPoint} // TODO: Check if it can be improved by just sending initialValues={nodeData}
        defaultMethod={nodeData.method} 
        defaultBody={nodeData.body}  
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        description={description}
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
