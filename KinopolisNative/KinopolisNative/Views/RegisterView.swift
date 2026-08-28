import SwiftUI

struct RegisterView: View {
    @StateObject private var viewModel = RegisterViewModel()
    @Environment(\.presentationMode) var presentationMode
    
    var body: some View {
        ZStack {
            Color.black.edgesIgnoringSafeArea(.all)
            
            ScrollView {
                VStack(spacing: 25) {
                    Text("Registrierung")
                        .font(.largeTitle)
                        .fontWeight(.heavy)
                        .foregroundColor(.white)
                        .padding(.top, 40)
                    
                    Text("Kinopolis Automation")
                        .font(.subheadline)
                        .foregroundColor(.gray)
                    
                    VStack(spacing: 16) {
                        // Vorname
                        HStack {
                            Image(systemName: "person")
                                .foregroundColor(.gray)
                            TextField("Vorname", text: $viewModel.firstName)
                                .foregroundColor(.white)
                        }
                        .padding()
                        .background(Color(UIColor.darkGray).opacity(0.5))
                        .cornerRadius(10)
                        
                        // Nachname
                        HStack {
                            Image(systemName: "person.fill")
                                .foregroundColor(.gray)
                            TextField("Nachname", text: $viewModel.lastName)
                                .foregroundColor(.white)
                        }
                        .padding()
                        .background(Color(UIColor.darkGray).opacity(0.5))
                        .cornerRadius(10)
                        
                        // E-Mail
                        HStack {
                            Image(systemName: "envelope")
                                .foregroundColor(.gray)
                            TextField("E-Mail Adresse", text: $viewModel.email)
                                .keyboardType(.emailAddress)
                                .autocapitalization(.none)
                                .foregroundColor(.white)
                        }
                        .padding()
                        .background(Color(UIColor.darkGray).opacity(0.5))
                        .cornerRadius(10)
                        
                        // Personalnummer (optional)
                        HStack {
                            Image(systemName: "number")
                                .foregroundColor(.gray)
                            TextField("Personalnummer (optional)", text: $viewModel.employeeNumber)
                                .keyboardType(.numberPad)
                                .foregroundColor(.white)
                        }
                        .padding()
                        .background(Color(UIColor.darkGray).opacity(0.5))
                        .cornerRadius(10)
                        
                        // Standort
                        HStack {
                            Image(systemName: "mappin.and.ellipse")
                                .foregroundColor(.gray)
                            Picker("Standort", selection: $viewModel.location) {
                                Text("Darmstadt").tag("kp")
                                Text("Sulzbach / MTZ").tag("su")
                                Text("Gießen").tag("gi")
                                Text("Hanau").tag("hu")
                                Text("Bonn").tag("bn")
                            }
                            .accentColor(.white)
                            Spacer()
                        }
                        .padding()
                        .background(Color(UIColor.darkGray).opacity(0.5))
                        .cornerRadius(10)
                        
                        // Passwort
                        HStack {
                            Image(systemName: "lock")
                                .foregroundColor(.gray)
                            SecureField("Passwort", text: $viewModel.password)
                                .foregroundColor(.white)
                        }
                        .padding()
                        .background(Color(UIColor.darkGray).opacity(0.5))
                        .cornerRadius(10)
                    }
                    .padding(.horizontal)
                    
                    if let error = viewModel.errorMessage {
                        Text(error)
                            .foregroundColor(.red)
                            .font(.footnote)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal)
                    }
                    
                    // Register Button
                    Button(action: {
                        viewModel.register()
                    }) {
                        if viewModel.isLoading {
                            ProgressView()
                                .progressViewStyle(CircularProgressViewStyle(tint: .white))
                                .frame(maxWidth: .infinity)
                                .padding()
                        } else {
                            Text("Account erstellen")
                                .font(.headline)
                                .fontWeight(.bold)
                                .frame(maxWidth: .infinity)
                                .padding()
                        }
                    }
                    .background(
                        LinearGradient(gradient: Gradient(colors: [Color(red: 229/255, green: 9/255, blue: 20/255), Color(red: 255/255, green: 61/255, blue: 71/255)]), startPoint: .topLeading, endPoint: .bottomTrailing)
                    )
                    .foregroundColor(.white)
                    .cornerRadius(12)
                    .padding(.horizontal)
                    .disabled(viewModel.isLoading)
                    
                    Button(action: {
                        presentationMode.wrappedValue.dismiss()
                    }) {
                        Text("Abbrechen")
                            .font(.footnote)
                            .foregroundColor(.gray)
                    }
                    .padding(.top, 10)
                    
                    Spacer(minLength: 40)
                }
            }
        }
        .alert(isPresented: $viewModel.registrationSuccess) {
            Alert(
                title: Text("Erfolg"),
                message: Text("Dein Account wurde erfolgreich erstellt. Du kannst dich nun anmelden."),
                dismissButton: .default(Text("OK")) {
                    presentationMode.wrappedValue.dismiss()
                }
            )
        }
    }
}
