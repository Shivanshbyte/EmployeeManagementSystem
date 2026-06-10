package com.employeesystem.emsbackend.repository;


import com.employeesystem.emsbackend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
//    Employee findByFirstNameAndEmail(String firstname,String email);
    Employee findByEmail(String email);
    @Query("""
        SELECT e
        FROM employeess e
        WHERE lower(e.firstName) LIKE lower(concat('%', :keyword, '%'))
        OR lower(e.lastName) LIKE lower(concat('%', :keyword, '%'))
        OR lower(e.email) LIKE lower(concat('%', :keyword, '%'))
        """)
    Page<Employee> searchEmployees(
            @Param("keyword") String keyword,
            Pageable pageable
    );
}
