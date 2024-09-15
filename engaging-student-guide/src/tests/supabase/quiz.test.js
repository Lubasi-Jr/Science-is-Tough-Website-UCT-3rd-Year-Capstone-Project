// // src/tests/supabase/quiz.test.js

// import { createClient } from "@supabase/supabase-js";
// import { fetchQuizzes, addQuiz } from "../../lib/supabaseClient"; // Adjust import as necessary
// import {describe, expect, test, beforeEach} from '@jest/globals';

// jest.mock("@supabase/supabase-js"); // Mock the entire module

// describe("Supabase functions", () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Clear any previous mock calls
//   });

//   test("fetchQuizzes should return quizzes for a given ID", async () => {
//     const mockQuizzes = [{ id: 1, question: "Question 1", options: [] }];
//     createClient.mockReturnValue({
//       from: jest.fn().mockReturnValue({
//         select: jest.fn().mockReturnThis(),
//         eq: jest.fn().mockResolvedValue({ data: mockQuizzes, error: null }),
//       }),
//     });

//     const data = await fetchQuizzes(1);
//     expect(data).toEqual(mockQuizzes);
//     expect(createClient().from).toHaveBeenCalledWith("quizzes");
//     expect(createClient().from().eq).toHaveBeenCalledWith("content_id", 1);
//   });

//   test("addQuiz should insert a new quiz", async () => {
//     const newQuiz = { question: "New Question", options: [] };
//     createClient.mockReturnValue({
//       from: jest.fn().mockReturnValue({
//         insert: jest.fn().mockResolvedValue({ data: [newQuiz], error: null }),
//       }),
//     });

//     const data = await addQuiz(newQuiz);
//     expect(data).toEqual([newQuiz]);
//     expect(createClient().from).toHaveBeenCalledWith("quizzes");
//     expect(createClient().from().insert).toHaveBeenCalledWith([newQuiz]);
//   });

//   // Additional tests can be added here
// });
