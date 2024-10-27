package com.jee.back.user.service;

import com.jee.back.auth.dto.RegisterDTO;
import com.jee.back.user.entity.User;
import com.jee.back.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public User findByUserId(String userId) {
        return userRepository.findUserByUserId(userId).orElseThrow(() -> new UsernameNotFoundException("user not found with userId: " + userId));
    }

    public User registerUser(RegisterDTO registerDTO) {
        User user = new User();
        User registerUser = modelMapper.map(registerDTO, User.class);
        return userRepository.save(registerUser);
    }
}
