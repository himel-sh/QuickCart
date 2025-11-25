import { serve } from "inngest/next";
import {
  creatUserOrder,
  inngest,
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
} from "@/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
    creatUserOrder,
  ],
});
