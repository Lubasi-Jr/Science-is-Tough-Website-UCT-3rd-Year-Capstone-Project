// import { useState, useEffect } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
// import { useNavigate } from "react-router-dom";
import { supabase } from "../src/lib/supabaseClient";
// import { useAuth } from "../src/hooks/useAuth";
import DashRecentlyUploaded from "../src/components/DashRecentlyUploaded";

const mockChallengeData = [
  {
    id: "e9d47b35-7034-4978-b263-d49a57874c72",
    created_at: "2024-08-14T14:34:56.645665+00:00",
    title: "The shape of your well-being",
    author: "Naseera Moosa",
    pdf_url:
      "https://hlatgyxtxgahhbtycuek.supabase.co/storage/v1/object/public/pdfs/e9d47b35-7034-4978-b263-d49a57874c72/SiT_Well-being_advance%20release.pdf?t=2024-09-02T08%3A47%3A05.010Z",
    audio_url:
      "https://hlatgyxtxgahhbtycuek.supabase.co/storage/v1/object/public/audios/e9d47b35-7034-4978-b263-d49a57874c72/the%20shape%20of%20your%20well-being_the%20shape%20of%20your%20well-being.wav?t=2024-09-15T06%3A14%3A53.409Z",
    category: "Mental Health",
    summary:
      "The Shape of Your Well-Being\r\nBreathing Exercises for Stress Management  \r\nBreathing exercises can be beneficial for managing stress and promoting a sense of calm. The technique involves inhaling for four counts, holding the breath for four counts, exhaling for four counts, and then holding the breath again for four counts. Regular practice of these exercises can help lower your heart rate, reduce blood pressure, and increase oxygen flow, which can contribute to a general feeling of calmness and better handling of anxiety when it arises.\r\n\r\nSeeking Support for Stress  \r\nIf you're struggling with stress, it's important to reach out for support. Talk to a mentor, counselor, or trusted friend about how you're feeling. Understanding that others around you might be experiencing similar stress can help normalize your feelings and improve your coping mechanisms.\r\n\r\nThe Stigma of Mental Illness  \r\nMental illness is a widespread issue and should not be treated with shame or secrecy. It is a common experience that affects many people at different stages of their lives. Addressing mental health openly and without stigma is crucial for effective management and treatment.\r\n\r\nPersonal Experience: Sitara Hooseria  \r\nSitara Hooseria, a final-year chemistry student, shares her personal experience with Major Depressive Disorder and Social Anxiety. She describes the difficulty of facing academic challenges while dealing with depression, emphasizing the importance of choosing happiness and aligning your major with your interests.\r\n\r\nAvoiding Academic Overwork  \r\nAvoid overworking yourself, even though academics are important. Focusing solely on studies can lead to significant mental health issues in the long run. It's essential to balance academics with other aspects of life, including making friends, creating memories, and enjoying life outside of studying.\r\n\r\nMaintaining Focus on Goals  \r\nRemember why you came to university and maintain focus on your long-term goals. While having fun is important, staying on track with your academic and personal goals is equally crucial. Don't feel pressured to engage in activities or schedules that don't align with your readiness or respect for your personal boundaries.\r\n\r\nRecognizing Signs of Depression  \r\nBe vigilant about signs of depression in yourself and others. Symptoms include persistent sadness, lack of sleep, loss of interest in activities, isolation, anxiety, lack of energy, reckless behavior, and suicidal thoughts. Seeking help early is important—don't hesitate to make an appointment with Student Wellness Services (SWS) if needed.\r\n\r\nImportance of Relaxation  \r\nRelaxation is key to maintaining mental well-being. After a busy week, take time to unwind by spending time with family or friends and engaging in activities you enjoy. This helps your brain process the week’s events and recharge for the upcoming challenges.\r\n\r\nEngaging with Nature and Culture  \r\nEngage in activities that connect you with nature and others. Spending time outdoors, participating in community events, or enjoying hobbies can provide valuable relaxation and rejuvenation. Embrace cultural practices that value rest and downtime as essential for mental health.\r\n\r\nBalancing Relaxation and Peer Pressure  \r\nBe mindful of how you spend your relaxation time. Avoid succumbing to peer pressure and ensure that your relaxation activities align with your values and goals. It’s important to create a balance and engage in activities that genuinely benefit your well-being.\r\n\r\nSubstance Use and Its Effects  \r\nIf you choose to use alcohol or other substances, be aware of their impact on your brain and overall health. Alcohol affects the hippocampus, impairing memory and learning, and can lead to risky behaviors. The brain's development continues into your late 20s, and substance use can interfere with this process.\r\n\r\nRespect in Relationships\r\nA person who truly loves you should treat you with respect and never undermine you, even in jest. If your romantic partner physically hurts you, seek help immediately and don't keep it a secret. It's important to seek advice from someone who cares about you rather than falling for promises of change.\r\n\r\nHonesty from Friends\r\nEncourage your friends to be honest with you about any red flags they observe. They can often provide clearer insights into your life than you might see yourself.\r\n\r\nResponsibility for Actions\r\nYou are not responsible for someone else's behavior, nor can you change someone who cheats or lies. However, you are responsible for your own actions and should be thoughtful in how you treat others to avoid causing harm to yourself or others.\r\n\r\nDealing with Breakups\r\nBreaking up is difficult, even if it's the right decision. Seek moral support from friends and allow yourself time to process and mourn the loss.\r\n\r\nPhysical Attraction and Decision-Making\r\nPhysical attraction can lead to more intimate relationships. Ensure that any physical actions are based on clear, conscious decisions rather than being influenced by the moment. Understand the consequences of unprotected sex, such as the risk of STDs and unintended pregnancy.\r\n\r\nFinancial Well-Being\r\nManaging finances effectively is crucial for academic success. Create a budget, track your spending, and save for emergencies. If needed, look for part-time work, but be mindful not to overextend yourself.\r\n\r\nHelp-Seeking Behavior\r\nSeeking help is part of problem-solving and resilience. Don’t be embarrassed to ask for assistance and be proactive in reaching out to lecturers, tutors, or other support resources. Clearly communicate your needs and remember that there are various sources of support available.\r\n\r\nStudent Wellness Services (SWS)\r\nThe SWS offers medical and counseling services, including a team of professionals who understand students' needs. Make sure to book appointments in advance and be aware of the travel time to their location. Utilize their services before exams and seek help early if issues arise.\r\n\r\nPaying for Services\r\nNSFAS students do not pay for SWS services. If you have medical aid, you can pay cash and claim back, but note that some services like psychology may not be covered. It is best to settle bills on the day of your consultation.\r\n\r\nAcademic Well-Being\r\nMaintain academic well-being by managing your time effectively, attending classes, and balancing work with breaks. Avoid cramming and allow yourself the space to struggle and make mistakes as part of your learning process.\r\n\r\nPlanning and Resilience\r\nThe concept of \"Icebo liyazakha\" means that everything will be okay, even if you face challenges. Don't give up or feel like it’s the end of the world; keep trying and believing that things will improve.\r\n\r\nSelf-Assessment\r\nUse a radar chart to assess different areas of your well-being. Identify areas where you’re doing well and where you need improvement. Set practical steps to address these areas and take action towards a better you. Remember to acknowledge and celebrate your successes.",
    favourite: true,
    image_url:
      "https://media.istockphoto.com/id/1310277551/vector/happy-healthy-brain-mind-character-meditation-yoga-relax-health-brain-mental-organ-sit-in.jpg?s=612x612&w=0&k=20&c=sei6jMApCiXroaZcvnoIJzI5cpNFs6CqMCV2KOiM3WA=",
  },
];

// mocking supabase
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../src/lib/supabaseClient", () => ({
  supabase: {
    rpc: vi.fn(),
    from: vi.fn(() => ({
      select: vi.fn().mockResolvedValue({ data: mockChallengeData, error: null }),
    })),
    channel: vi.fn().mockReturnValue({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnValue({
        unsubscribe: vi.fn(),
      }),
    }),
    removeChannel: vi.fn(),
  },
}));

// mocking useAuth
vi.mock("../src/hooks/useAuth", () => ({
  useAuth: vi.fn().mockReturnValue({
    user: "user-id", // Replace with your desired user object
  }),
}));
vi.mock("../src/context/contextRecentActivity", () => ({
  RecentContext: vi
    .fn()
    .mockResolvedValue({ recentContent: null, contentType: "pdf" }),
}));

// Vitest test for the TestQuiz component
describe("Dash Content/Recently Uploaded Component", () => {
  it("test dash challenges load successfully", async () => {
    render(<DashRecentlyUploaded />);
    await waitFor(() =>
      expect(
        screen.getByText(/The shape of your well-being/)
      ).toBeInTheDocument()
    );

    screen.debug();
  });
});
