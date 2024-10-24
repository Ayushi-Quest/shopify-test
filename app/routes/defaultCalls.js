import axios from "axios";
import { generalFunction } from "../config/generalFunction";



export const defaultCalls = async({
    priority = "all"
}) => {
    try {
        const parentRequest = generalFunction.createUrl(`/api/entities/${generalFunction.getEntityId()}/quests/q-shopify-component?userId=${generalFunction.getUserId()}`);
        const referralRequest = generalFunction.createUrl(`/api/entities/${generalFunction.getEntityId()}/quests/q-shopify-referral?userId=${generalFunction.getUserId()}`);

        const [parentResponse, referralResponse] = await Promise.all(priority == "main" ?
            [
                axios(parentRequest.url, {
                    headers: parentRequest.headers,
                }),
                {data: {success: true}}
            ] : priority == "referral" ? 
            [
                {data: {success: true}},
                axios(referralRequest.url, {
                    headers: referralRequest.headers,
                }),
            ] : [
            axios(parentRequest.url, {
                headers: parentRequest.headers,
            }),
            axios(referralRequest.url, {
                headers: referralRequest.headers,
            }),
        ]);

        if (priority == "main") {
            if (parentResponse?.data?.success == false) {
                return await createParentQuest()
            } else {
                return parentResponse?.data
            }
        } else if (priority == "referral") {
            if (referralResponse?.data?.success == false) {
                return await createReferralQuest()
            } else {
                return referralResponse?.data
            }
        } else {
            if (parentResponse?.data?.success == false) {
                await createParentQuest()
            }
    
            if (referralResponse?.data?.success == false) {
                await createReferralQuest()
            }
        }
    } catch (error) {
        console.error(error);
    }
}


const createParentQuest = async() => {
    try {
        const request = generalFunction.createUrl(`/api/entities/${generalFunction.getEntityId()}/quests?userId=${generalFunction.getUserId()}`);
        const response = await axios.post(request.url, {
            defaultId: "q-shopify-component",
            title: "Shopify Component",
            description: "Shopify Component",
            eligibilityCriterias: [
                {
                    type: "USER_INPUT_TEXT",
                    source: "USER_INPUT",
                    data: {
                        title: "Place an Order",
                        effort: "E1",
                        importance: "I1",
                        xp: "2",
                        frequency: "ONCE",
                        isRequired: false,
                        gemContractId: "",
                        gems: "",
                        description: "Gain 10 XP for every $100 spent to encourage ongoing purchases.",
                        imageUrl: "",
                        isActive: true
                    }
                }
            ],
            rewards: [
                {
                    type: "REWARD_XP",
                    xp: 0,
                    metadata: {}
                }
            ],
            hasReferral: true,
        }, {
            headers: request.headers,
        });

        return response?.data;
    } catch (error) {
        console.error(error);
    }
}

const createReferralQuest = async() => {
    try {
        const request = generalFunction.createUrl(`/api/entities/${generalFunction.getEntityId()}/quests?userId=${generalFunction.getUserId()}`);
        const response = await axios.post(request.url, {
            defaultId: "q-shopify-referral",
            title: "Drive Loyalty with Reward Points",
            description: "Engage your customers with easy ways to earn rewards and stay connected!",
            eligibilityCriterias: [
                {
                    type: "USER_INPUT_TEXT",
                    source: "USER_INPUT",
                    data: {
                        title: "test",
                        effort: "E1",
                        importance: "I1",
                        xp: "2",
                        frequency: "ONCE",
                        isRequired: false,
                        gemContractId: "",
                        gems: "",
                        description: "",
                        imageUrl: ""
                    }
                }
            ],
            rewards: [
                {
                    type: "REWARD_XP",
                    xp: 0,
                    metadata: {}
                }
            ],
            hasReferral: true,
            priority: 1,
            referralXP: 10,
            referredUserXP: 50,
            visibility: "PUBLIC",
            isMultiQuest: false,
            metadata: {
                socials: [],
                referralLink: ""
            }
        }, {
            headers: request.headers,
        });

        return response?.data;
    } catch (error) {
        console.error(error);
    }
}


