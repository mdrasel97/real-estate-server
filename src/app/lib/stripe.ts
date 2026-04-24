import Stripe from "stripe";
import { envConfig } from "../../config/env";

export const stripe = new Stripe(envConfig.STRIPE_SECRET_KEY);


// stripe payment system integration for subscription management and payment processing.