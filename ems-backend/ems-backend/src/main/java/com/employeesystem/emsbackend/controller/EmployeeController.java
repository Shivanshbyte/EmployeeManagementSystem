package com.employeesystem.emsbackend.controller;

import com.employeesystem.emsbackend.entity.Employee;
import com.employeesystem.emsbackend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import jakarta.validation.Valid;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(path = "/api/emp")
@AllArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<Employee> createEmployee(
            @Valid @RequestBody Employee employee){

        System.out.println("REQUEST RECEIVED");
        System.out.println(employee.getFirstName());
        System.out.println(employee.getLastName());
        System.out.println(employee.getEmail());
        Employee emp = employeeService.addEmployee(employee);
        return new ResponseEntity<>(emp, HttpStatus.CREATED);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Employee> findEmployeeById(@PathVariable("id") Long id) {
        Employee emp = employeeService.findEmployeeById(id);
        return ResponseEntity.ok(emp);
    }

    @GetMapping
    public ResponseEntity<Page<Employee>> getAllEmployee(
            Pageable pageable) {

        return ResponseEntity.ok(
                employeeService.getEmployees(pageable)
        );
    }

    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable("id") Long id,
            @Valid @RequestBody Employee updateEmployee) {

        Employee emp = employeeService.updateEmployee(id, updateEmployee);
        return ResponseEntity.ok(emp);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteById(@PathVariable("id") Long id) {
        employeeService.deleteEmployeeById(id);
        return ResponseEntity.ok("Employee Deleted Successfully");
    }
//    @GetMapping("/{email}")
//    public ResponseEntity<Employee> findFirstNameAndEmail(@RequestBody String firstname,@RequestBody String email){
//        Employee emp = employeeService.findFirstNameAndEmail(firstname,email);
//        return ResponseEntity.ok(emp);
//    }
    @GetMapping("/email-id/{mail}")
    public ResponseEntity<Employee> findByEmployeeEmail(@PathVariable("mail") String email){
       return ResponseEntity.ok(employeeService.findEmployeeByEmail(email));

    }
    @GetMapping("/search")
    public ResponseEntity<Page<Employee>> searchEmployees(
            @RequestParam String keyword,
            Pageable pageable){

        return ResponseEntity.ok(
                employeeService.searchEmployees(
                        keyword,
                        pageable
                )
        );
    }



}
