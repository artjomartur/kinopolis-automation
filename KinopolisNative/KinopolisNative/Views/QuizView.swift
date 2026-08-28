import SwiftUI

struct QuizView: View {
    @Environment(\.dismiss) var dismiss
    @AppStorage("userXP") private var userXP: Int = 120
    
    @State private var currentQuestionIndex = 0
    @State private var score = 0
    @State private var showResult = false
    @State private var selectedAnswer: Int? = nil
    @State private var isAnswerCorrect: Bool? = nil
    
    struct Question {
        let text: String
        let answers: [String]
        let correctIndex: Int
        let explanation: String
    }
    
    let questions: [Question] = [
        Question(
            text: "Ab wie viel Jahren ist 'Deadpool & Wolverine' freigegeben (FSK)?",
            answers: ["Ab 12 Jahren", "Ab 16 Jahren", "Ab 18 Jahren", "Ohne Altersbeschränkung"],
            correctIndex: 1,
            explanation: "Trotz viel Action und Humor hat die FSK den Film in Deutschland ab 16 Jahren freigegeben."
        ),
        Question(
            text: "Welcher Film war 2023 weltweit am erfolgreichsten an den Kinokassen?",
            answers: ["Oppenheimer", "Super Mario Bros.", "Barbie", "Avatar: The Way of Water"],
            correctIndex: 2,
            explanation: "Barbie spielte weltweit über 1,4 Milliarden US-Dollar ein und war der Hit 2023."
        ),
        Question(
            text: "Wer führt bei 'Oppenheimer' Regie?",
            answers: ["Steven Spielberg", "Christopher Nolan", "Quentin Tarantino", "Martin Scorsese"],
            correctIndex: 1,
            explanation: "Christopher Nolan führte Regie bei Oppenheimer und gewann dafür seinen ersten Oscar."
        )
    ]
    
    var body: some View {
        NavigationView {
            ZStack {
                Color(UIColor.systemBackground).ignoresSafeArea()
                
                VStack(spacing: 24) {
                    if showResult {
                        resultView
                    } else {
                        questionView
                    }
                }
                .padding()
            }
            .navigationTitle("Kino-Wissens-Quiz")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Schließen") { dismiss() }
                        .foregroundColor(.blue)
                }
            }
        }
    }
    
    private var questionView: some View {
        VStack(spacing: 20) {
            Text("Frage \(currentQuestionIndex + 1) von \(questions.count)")
                .font(.subheadline)
                .foregroundColor(.gray)
            
            Text(questions[currentQuestionIndex].text)
                .font(.title3)
                .fontWeight(.bold)
                .foregroundColor(.primary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
            
            VStack(spacing: 12) {
                ForEach(0..<questions[currentQuestionIndex].answers.count, id: \.self) { index in
                    Button(action: {
                        if selectedAnswer == nil {
                            checkAnswer(index)
                        }
                    }) {
                        Text(questions[currentQuestionIndex].answers[index])
                            .font(.headline)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(buttonColor(for: index))
                            .foregroundColor(.primary)
                            .cornerRadius(12)
                            .overlay(
                                RoundedRectangle(cornerRadius: 12)
                                    .stroke(Color.white.opacity(0.1), lineWidth: 1)
                            )
                    }
                    .disabled(selectedAnswer != nil)
                }
            }
            .padding(.top, 20)
            
            if let isCorrect = isAnswerCorrect {
                VStack(spacing: 8) {
                    Text(isCorrect ? "✅ Richtig! +10 XP" : "❌ Falsch!")
                        .font(.headline)
                        .foregroundColor(isCorrect ? .green : .red)
                    
                    Text(questions[currentQuestionIndex].explanation)
                        .font(.caption)
                        .foregroundColor(.gray)
                        .multilineTextAlignment(.center)
                    
                    Button(action: nextQuestion) {
                        Text(currentQuestionIndex == questions.count - 1 ? "Ergebnis anzeigen" : "Nächste Frage")
                            .fontWeight(.bold)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.blue)
                            .foregroundColor(.primary)
                            .cornerRadius(12)
                    }
                    .padding(.top, 12)
                }
                .padding()
                .background(Color.white.opacity(0.05))
                .cornerRadius(12)
                .padding(.top, 20)
            }
            
            Spacer()
        }
    }
    
    private var resultView: some View {
        VStack(spacing: 24) {
            Image(systemName: "star.circle.fill")
                .font(.system(size: 80))
                .foregroundColor(.yellow)
            
            Text("Quiz Beendet!")
                .font(.title)
                .fontWeight(.bold)
                .foregroundColor(.primary)
            
            Text("Du hast \(score) von \(questions.count) Fragen richtig beantwortet.")
                .font(.headline)
                .foregroundColor(.gray)
            
            Text("Verdiente XP: +\(score * 10)")
                .font(.title2)
                .fontWeight(.bold)
                .foregroundColor(.green)
            
            Button(action: {
                userXP += (score * 10)
                dismiss()
            }) {
                Text("XP Einsammeln & Schließen")
                    .fontWeight(.bold)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.primary)
                    .cornerRadius(12)
            }
            .padding(.top, 20)
        }
        .padding()
    }
    
    private func checkAnswer(_ index: Int) {
        selectedAnswer = index
        let correct = index == questions[currentQuestionIndex].correctIndex
        isAnswerCorrect = correct
        if correct {
            score += 1
        }
    }
    
    private func nextQuestion() {
        if currentQuestionIndex < questions.count - 1 {
            currentQuestionIndex += 1
            selectedAnswer = nil
            isAnswerCorrect = nil
        } else {
            showResult = true
        }
    }
    
    private func buttonColor(for index: Int) -> Color {
        guard let selected = selectedAnswer else {
            return Color.white.opacity(0.08)
        }
        
        if index == questions[currentQuestionIndex].correctIndex {
            return Color.green.opacity(0.8)
        } else if index == selected {
            return Color.red.opacity(0.8)
        }
        
        return Color.white.opacity(0.04)
    }
}
