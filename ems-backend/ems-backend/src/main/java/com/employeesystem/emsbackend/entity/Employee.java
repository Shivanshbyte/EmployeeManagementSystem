package com.employeesystem.emsbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "employeess")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "First Name is required")
    @Size(min = 2, max = 30)
    @Column(name = "first_name")
    private String firstName;

    @NotBlank(message = "Last Name is required")
    @Size(min = 2, max = 30)
    @Column(name = "last_name")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email Format")
    @Column(name = "email_id", nullable = false, unique = true)
    private String email;
}
